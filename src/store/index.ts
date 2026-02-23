import { configureStore } from '@reduxjs/toolkit';
import idvReducer from './slices/idvSlice';

export const store = configureStore({
  reducer: {
    idv: idvReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
