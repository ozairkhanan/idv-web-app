import React, { useEffect, useRef } from 'react';
import incode from '../../services/incode.service';
import { nextStep, setError } from '../../store/slices/idvSlice';
import type { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const DocumentSelector: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const session = useAppSelector((state: RootState) => state.idv.session);

  useEffect(() => {
    if (isMounted.current || !containerRef.current || !session) return;

    incode.renderDocumentSelector(containerRef.current, {
      onSuccess: () => {
        dispatch(nextStep());
      },
      onError: (err: any) => {
        dispatch(setError(err.message || 'Document selection failed'));
      },
      token: session,
      numberOfTries: 3,
      showTutorial: true,
      showCustomCameraPermissionScreen: true,
      showDoublePermissionsRequest: true,
    });

    isMounted.current = true;
  }, [session, dispatch]);

  return <div ref={containerRef} className="w-full" />;
};

export default DocumentSelector;
