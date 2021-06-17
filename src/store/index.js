import { configureStore } from '@reduxjs/toolkit';
import briefcase from './slices/briefcase';
import showcase from './slices/showcase';
import securityItem from './slices/securityItem';

export const store = configureStore({
  reducer: {
    briefcase,
    showcase,
    securityItem,
  }
});