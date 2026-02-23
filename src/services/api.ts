import axiosInstance from './axiosInstance';

export const getVerificationLink = async (userId: string) => {
  try {
    const { data } = await axiosInstance.post('/api/getLink', { userId });
    return data;
  } catch (err: any) {
    return { 
      status: false, 
      message: err.response?.data?.message || err.message || "Failed to fetch verification link" 
    };
  }
};

export const verifyData = async (verificationBody: any) => {
  try {
    const { data } = await axiosInstance.post('/api/verifyData', verificationBody);
    return data;
  } catch (err: any) {
    return { 
      status: false, 
      message: err.response?.data?.message || err.message || "Data verification failed" 
    };
  }
};

export default axiosInstance;
