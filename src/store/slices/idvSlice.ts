import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IDVState {
  session: any | null;
  userId: string | null;
  appType: string | null;
  step: number;
  customerID: string | null;
  authData: any | null;
  liveness: boolean;
  userExists: boolean;
  geoLocation: { latitude: number; longitude: number } | null;
  error: string | null;
  loader: boolean;
}

const initialState: IDVState = {
  session: null,
  userId: null,
  appType: null,
  step: 0,
  customerID: null,
  authData: null,
  liveness: false,
  userExists: false,
  geoLocation: null,
  error: null,
  loader: false,
};

const idvSlice = createSlice({
  name: 'idv',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<any>) => {
      state.session = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setAppType: (state, action: PayloadAction<string>) => {
      state.appType = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    setCustomerID: (state, action: PayloadAction<string>) => {
      state.customerID = action.payload;
    },
    setAuthData: (state, action: PayloadAction<any>) => {
      state.authData = action.payload;
    },
    setLiveness: (state, action: PayloadAction<boolean>) => {
      state.liveness = action.payload;
    },
    setUserExists: (state, action: PayloadAction<boolean>) => {
      state.userExists = action.payload;
    },
    setGeoLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.geoLocation = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    resetIDV: () => {
      return initialState;
    },
  },
});

export const {
  setSession,
  setUserId,
  setAppType,
  setStep,
  nextStep,
  setCustomerID,
  setAuthData,
  setLiveness,
  setUserExists,
  setGeoLocation,
  setError,
  setLoader,
  resetIDV,
} = idvSlice.actions;

export default idvSlice.reducer;
