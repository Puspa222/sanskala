import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
