import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { 
  setSession, 
  setUserId, 
  setAppType, 
  setGeoLocation,
  setError
} from '../store/slices/idvSlice';
import incode, { FlowID } from '../services/incode.service';
import { getVerificationLink as fetchLink } from '../services/api';

export const useIDV = () => {
  const dispatch = useAppDispatch();
  const [linkData, setLinkData] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      userID: params.get("userID"),
      appType: params.get("appType"),
    };
  }, []);

  const isParamsMissing = !queryParams.userID;

  // TOGGLE THIS FOR TESTING: Set to false to force mobile view on desktop
//   const isDesktop = incode.isDesktop(); 
  const isDesktop = false; 

  useEffect(() => {
    if (isInitialized || isParamsMissing) return;

    const { userID, appType } = queryParams;

    if (userID) dispatch(setUserId(userID));
    if (appType) dispatch(setAppType(appType));

    const initializeFlow = async () => {
      if (!userID) return;
      
      const data = await fetchLink(userID);
      setLinkData(data);

      if (data.status) {
        if (!isDesktop) {
          try {
            const session = await incode.createSession("ALL", undefined, {
              configurationId: FlowID,
              externalCustomerId: userID,
            });
            await incode.warmup();
            dispatch(setSession(session));

            navigator.geolocation.getCurrentPosition(
              (pos) => dispatch(setGeoLocation({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
              })),
              (err) => console.log("Location error:", err)
            );
          } catch (sessionErr: any) {
            dispatch(setError(sessionErr.message || "Failed to initialize Incode session"));
          }
        }
        setIsInitialized(true);
      } else {
        dispatch(setError(data.message));
      }
    };

    initializeFlow();
  }, [queryParams, dispatch, isInitialized, isParamsMissing, isDesktop]);

  return {
    linkData,
    queryParams,
    isDesktop
  };
};
