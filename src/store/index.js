import { configureStore } from '@reduxjs/toolkit';
import securities from './slices/securities';
import events from './slices/events';
import securityItem from './slices/securityItem';

export const store = configureStore({
  reducer: {
    securities,
    events,
    securityItem,
  }
});