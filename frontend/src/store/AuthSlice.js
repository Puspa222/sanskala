import { createSlice } from "@reduxjs/toolkit";

// Initial state with the session check
const initialState = {
  status: localStorage.getItem("session_id") ? true : false, // Check session_id in localStorage
  userData: localStorage.getItem("session_id") ? JSON.parse(localStorage.getItem("userData")) : null, // Fetch userData if session_id exists
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      // Store userData and session_id in localStorage
      localStorage.setItem("session_id", action.payload.session_id);
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      // Remove session_id and userData from localStorage on logout
      localStorage.removeItem("session_id");
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
