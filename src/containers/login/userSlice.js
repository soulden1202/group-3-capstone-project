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
    properties: localStorage.getItem("properties"),
  },
  reducers: {
    setUserInfo(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.accountType = action.payload.accountType;
      state.user = action.payload.user;
      state.properties = action.payload.properties;
    },
    clearUserInfo(state) {
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.accountType = null;
      state.user = null;
      state.properties = null;
    },
    propertiesAdded(state, action) {
      state.properties = action.payload.properties;
    },
  },
});

export const { setUserInfo, clearUserInfo, propertiesAdded } =
  userSlice.actions;

export default userSlice.reducer;
