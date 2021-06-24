import { configureStore } from "@reduxjs/toolkit";
import securities from "./slices/securities";
import events from "./slices/events";

export const store = configureStore({
  reducer: {
    securities,
    events,
  },
});
