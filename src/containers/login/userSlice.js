import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: localStorage.getItem("id"),
    lastName: localStorage.getItem("lastName"),
    firstName: localStorage.getItem("firstName"),
    email: localStorage.getItem("email"),
    accountType: localStorage.getItem("accountType"),
    user: localStorage.getItem("user"),
  },
  reducers: {
    setUserInfo(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.accountType = action.payload.accountType;
      state.user = action.payload.user;
    },
    clearUserInfo(state) {
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.accountType = null;
      state.user = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
