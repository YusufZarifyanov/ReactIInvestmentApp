import { configureStore } from "@reduxjs/toolkit";
import securities from "./slices/securities";
import events from "./slices/events";
import modals from "./slices/modals";

export const store = configureStore({
  reducer: {
    securities,
    events,
    modals,
  },
});
