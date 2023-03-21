import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: localStorage.getItem("id"),
    lastName: localStorage.getItem("lastName"),
    firstName: localStorage.getItem("firstName"),
    email: localStorage.getItem("email"),
    accountType: localStorage.getItem("accountType"),
    isSubscripted: localStorage.getItem("isSubscripted"),
    endOfSubscription: localStorage.getItem("endOfSubscription"),
  },
  reducers: {
    setUserInfo(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.accountType = action.payload.accountType;
      state.isSubscripted = action.payload.isSubscripted;
      state.endOfSubscription = action.payload.endOfSubscription;
    },
    clearUserInfo(state) {
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.accountType = null;
      state.isSubscripted = null;
      state.endOfSubscription = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
