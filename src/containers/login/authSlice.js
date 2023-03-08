import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
        isLoggedIn: false,
    },
    reducers: {
        setTokens(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.expiresAt = action.payload.expiresAt;
            state.isLoggedIn = true;
        },
        clearAuth(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.expiresAt = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setTokens, clearAuth } = authSlice.actions;

export default authSlice.reducer;

