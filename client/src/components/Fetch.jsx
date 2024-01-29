/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Fetch = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const { user, updateUser } = useUser();

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate('/login');
            }

            const { data } = await axios.post(
                'http://localhost:3000',
                {},
                { withCredentials: true }
            );

            const { status, user } = data;
            updateUser(user);

            if (!status) {
                removeCookie('token');
                navigate('/login');
            }
        };

        verifyCookie();
    }, [cookies, navigate, removeCookie, updateUser]);

    return (
        <>
        </>
    );
};

export default Fetch;
