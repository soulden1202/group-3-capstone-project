import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        accountType: null,
    },
    reducers: {
        setUserInfo(state, action) {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.accountType = action.payload.accountType;
        },
        clearUserInfo(state) {
            state.id = null;
            state.email = null;
            state.firstName = null;
            state.lastName = null;
            state.accountType = null;
        },
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;

