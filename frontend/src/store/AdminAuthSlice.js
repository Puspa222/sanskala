import { createSlice } from "@reduxjs/toolkit";

// Initial state with the session check
const initialState = {
  status: false,
  adminLogin: () => {},
  adminLogout: () => {},
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    adminLogout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { adminLogin, adminLogout } = authSlice.actions;
export default adminAuthSlice.reducer;
