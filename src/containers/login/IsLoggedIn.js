import { useSelector } from 'react-redux';

export const IsLoggedIn = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return isLoggedIn;
};
