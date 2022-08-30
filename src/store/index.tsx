import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.slice";
import patientReducer from "./patient.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
  },
});
