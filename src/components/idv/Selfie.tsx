import React, { useEffect, useRef } from 'react';
import incode, { FlowID } from '../../services/incode.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { nextStep, setError, setLiveness, setUserExists, setCustomerID } from '../../store/slices/idvSlice';
import type { RootState } from '../../store';

const Selfie: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const session = useAppSelector((state: RootState) => state.idv.session);

  useEffect(() => {
    if (isMounted.current || !containerRef.current || !session) return;

    incode.renderCamera("selfie", containerRef.current, {
      onSuccess: async (res: any) => {
        try {
          // 1. Store liveness and user existence data
          dispatch(setLiveness(res?.liveness));
          dispatch(setUserExists(res?.existingUser));

          // 2. Process Government Validation (merged from FaceMatch)
          await incode.processGovernmentValidation({ token: session.token });
          
          // 3. Check Finish Status
          const status = await incode.getFinishStatus(FlowID, { token: session.token });
          
          // 4. Manual Approval if not automatic
          if ((status as any) !== "approved") {
            const { customerId } = await incode.approve({ token: session.token });
            dispatch(setCustomerID(customerId));
          }

          // 5. Proceed to next step
          dispatch(nextStep());
        } catch (err: any) {
          dispatch(setError(err.message || 'Verification post-processing failed'));
        }
      },
      onError: (err: any) => {
        dispatch(setError(err.message || 'Selfie capture failed'));
      },
      token: session,
      numberOfTries: 3,
      showTutorial: true,
      showCustomCameraPermissionScreen: true,
      showDoublePermissionsRequest: true,
      lensesCheckEnabled: true,
      maskCheckEnabled: true,
      hatCheckEnabled: true,
    });

    isMounted.current = true;
  }, [session, dispatch]);

  return <div ref={containerRef} className="w-full" />;
};

export default Selfie;
