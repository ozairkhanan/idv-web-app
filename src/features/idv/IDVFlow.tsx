import React from 'react';
import QRCode from 'react-qr-code';
import { useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import { useIDV } from '../../hooks/useIDV';

import Loader from '../../components/shared/Loader';
import Layout from '../../components/shared/Layout';
import Steps from '../../components/shared/Steps';
import ThankYouMessage from '../../components/shared/ThankYouMessage';

import UserConsent from '../../components/idv/UserConsent';
import DocumentSelector from '../../components/idv/DocumentSelector';
import Selfie from '../../components/idv/Selfie';
import Verification from '../../components/idv/Verification';

const IDVFlow: React.FC = () => {
  const { linkData, queryParams, isDesktop } = useIDV();
  const { step, session, error } = useAppSelector((state: RootState) => state.idv);

  if (!linkData) {
    return <Loader />;
  }

  if (error) {
    return <ThankYouMessage errorMessage={error} />;
  }

  if (!linkData.status) {
    return <ThankYouMessage errorMessage={linkData.message} />;
  }

  if (isDesktop) {
    return (
      <Layout>
        <div className="flex flex-col items-center space-y-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">
            Verify Your Identity
          </h1>
          <div className="p-6 bg-white rounded-3xl shadow-header ring-1 ring-slate-100 transition-transform hover:scale-105 duration-300">
            <QRCode value={window.location.href} size={256} />
          </div>
          <p className="text-slate-600 font-medium">
            Please scan this QR code with your mobile device to complete the secure verification process.
          </p>
        </div>
      </Layout>
    );
  }

  if (!session) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {queryParams.appType !== "AUTHENTICATION" ? (
        <Steps currentStep={step}>
          <UserConsent />
          <DocumentSelector />
          <Selfie />
          <Verification />
        </Steps>
      ) : (
        <Steps currentStep={step}>
          <Verification />
        </Steps>
      )}
    </div>
  );
};

export default IDVFlow;
