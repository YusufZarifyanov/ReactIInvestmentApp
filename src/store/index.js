import { configureStore, combineReducers } from '@reduxjs/toolkit';
import overview from './slices/briefcase/overview';
import upsdowns from './slices/showcase/upsdowns';
import events from './slices/showcase/events';
import securityItem from './slices/securityItem';

export const store = configureStore({
  reducer: {
    briefcase: combineReducers({
      overview
    }),
    showcase: combineReducers({
      upsdowns,
      events,
    }),
    securityItem,
  }
});