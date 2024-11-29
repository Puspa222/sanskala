import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import adminAuthSlice from "./AdminAuthSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminAuth: adminAuthSlice,
  },
});

export default store;
