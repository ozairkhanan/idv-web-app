import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLoader, setError } from '../../store/slices/idvSlice';
import { verifyData } from '../../services/api';
import Loader from '../shared/Loader';
import ThankYouMessage from '../shared/ThankYouMessage';
import type { RootState } from '../../store';

const Verification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    session, 
    userId, 
    customerID, 
    geoLocation, 
    appType, 
    authData, 
    loader,
    error 
  } = useAppSelector((state: RootState) => state.idv);

  useEffect(() => {
    const runVerification = async () => {
      dispatch(setLoader(true));
      
      const verificationBody: any = appType === "AUTHENTICATION" ? {
        type: appType,
        user_id: userId,
        data: JSON.stringify(authData),
      } : {
        session_id: session?.interviewId,
        user_id: userId,
        customer_id: customerID,
        customer_token: session?.token,
        geoLocation
      };

      const res = await verifyData(verificationBody);
      
      if (!res.status) {
        dispatch(setError(res.message || 'Verification data submission failed'));
      }
      
      dispatch(setLoader(false));
    };

    runVerification();
  }, [dispatch, appType, userId, authData, session, customerID, geoLocation]);

  if (loader) return <Loader />;
  if (error) return <ThankYouMessage errorMessage={error} />;

  return (
    <ThankYouMessage 
      primaryMessage="Thank You!" 
      secondaryMessage="You have completed the verification process." 
    />
  );
};

export default Verification;
