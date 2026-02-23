import React from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from './Layout';
import { adminEmail } from '../../services/incode.service';

import companyLogo from '../../assets/comapny.png';
import verifinowLogo from '../../assets/verifinow.png';

interface ThankYouMessageProps {
  primaryMessage?: string;
  secondaryMessage?: string;
  errorMessage?: string;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({
  primaryMessage,
  secondaryMessage,
  errorMessage,
}) => {
  return (
    <Layout>
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <img src={companyLogo} alt="Company Logo" className="h-12 w-auto object-contain" />
          <img src={verifinowLogo} alt="VerifNow Logo" className="h-8 w-auto object-contain" />
        </div>

        {errorMessage ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-red-50 p-4 rounded-full inline-block">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{errorMessage}</h2>
            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-red-700 font-medium flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Contact: 
                <a href={`mailto:${adminEmail}`} className="underline hover:text-red-800 transition-colors">
                  {adminEmail}
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-green-50 p-4 rounded-full inline-block">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            {primaryMessage && (
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {primaryMessage}
              </h1>
            )}
            {secondaryMessage && (
              <p className="text-lg text-slate-600 font-medium">
                {secondaryMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ThankYouMessage;
