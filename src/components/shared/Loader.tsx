import React from 'react';
import { Discuss } from 'react-loader-spinner';
import Layout from './Layout';

import companyLogo from '../../assets/comapny.png';
import verifinowLogo from '../../assets/verifinow.png';

const Loader: React.FC = () => {
  return (
    <Layout className="animate-pulse">
      <div className="flex flex-col items-center space-y-8 py-10">
        <div className="flex flex-col items-center space-y-4">
          <img src={companyLogo} alt="Company Logo" className="h-12 w-auto object-contain" />
          <img src={verifinowLogo} alt="VerifNow Logo" className="h-8 w-auto object-contain" />
        </div>
        
        <Discuss
          visible={true}
          height="120"
          width="120"
          ariaLabel="comment-loading"
          wrapperClass="comment-wrapper"
          color="#3b82f6"
        />
        
        <p className="text-slate-500 font-medium animate-bounce">
          Initializing secure verification...
        </p>
      </div>
    </Layout>
  );
};

export default Loader;
