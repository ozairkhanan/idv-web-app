import React, { useEffect, useRef } from 'react';
import incode from '../../services/incode.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { nextStep } from '../../store/slices/idvSlice';
import type { RootState } from '../../store';

const UserConsent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const session = useAppSelector((state: RootState) => state.idv.session);

  useEffect(() => {
    if (isMounted.current || !containerRef.current || !session) return;

    incode.renderUserConsent(containerRef.current, {
      session: session,
      onSuccess: () => {
        dispatch(nextStep());
      },
    });

    isMounted.current = true;
    
    const interval = setInterval(() => {
      const policy = document.getElementsByClassName("sc-hZDyAQ");
      const concentScreen = document.getElementsByClassName("sc-guJBdh");
      if (policy.length) policy?.[0].remove();
      if (concentScreen.length) {
         const parent = concentScreen[0];
         const lastInternalChild = parent.lastElementChild;
         if (lastInternalChild) {
           lastInternalChild.innerHTML = `I Accept VerifiNow's privacy policy & terms of use.`;
         }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [session, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div ref={containerRef} className="w-full" />
    </div>
  );
};

export default UserConsent;
