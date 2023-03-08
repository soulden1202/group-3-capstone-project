import { clearTokens } from '../login/authSlice';

const jwtMiddleware = store => next => action => {
    if (action.type.startsWith('api/')) {
        const state = store.getState();
        const { accessToken, expiresAt } = state.auth;

        // Check if token is expired
        if (accessToken && expiresAt && Date.now() >= expiresAt * 1000) {
            // Token is expired, clear tokens and redirect to login
            store.dispatch(clearTokens());
            window.location.href = '/login';
            return;
        }

        // Add authorization header with access token
        action.headers = {
            ...action.headers,
            Authorization: `Bearer ${accessToken}`,
        };
    }
    return next(action);
};

export default jwtMiddleware;
