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
    watchList: JSON.parse(localStorage.getItem("watchList")) || [],
    navBarMinimized: false,
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
      state.watchList = action.payload.watchList;
      state.navBarMinimized = false;
    },
    clearUserInfo(state) {
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.accountType = null;
      state.user = null;
      state.properties = null;
      state.watchList = null;
    },
    propertiesAdded(state, action) {
      state.properties = action.payload.properties;
    },
    changeNavbarSize(state, action) {
      state.navBarMinimized = action.payload.navBarMinimized;
    },
    changeName(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    updateWatchList(state, action) {
      state.watchList = action.payload.watchList;
      localStorage.setItem(
        "watchList",
        JSON.stringify(action.payload.watchList)
      );
    },
  },
});

export const {
  setUserInfo,
  clearUserInfo,
  propertiesAdded,
  changeNavbarSize,
  changeName,
  updateWatchList,
} = userSlice.actions;

export default userSlice.reducer;
