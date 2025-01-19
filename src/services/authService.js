// src/services/authService.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/auth/`;

export const userSignUp = async (data) => {
    try {
        
        const response = await axios.post(
            `${API_URL}register/`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: "same-origin"
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const userSignIn = (params) => async (dispatch) => {
    try {
        const response = axios.post(
            `${API_URL}login/`,
            params,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        );

        console.log(response);
    } catch (error) {
        console.error(error);
    }
};

export const login = async (provider, access_token) => {

    try {
        const res = await fetch(
            `${API_URL}social/sign/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    provider,
                    access_token
                })
            }
        )
        const jsson = await res.json();
        if (res.status !== 200) {
            return { success: false, message: res.error, data: null };
        }
        if (jsson.access) {
            localStorage.setItem('accessToken', jsson.access);
            localStorage.setItem('refreshToken', jsson.refresh);
            localStorage.setItem('user', JSON.stringify(jsson.data))
        }
        return { success: true, message: "success", data: jsson };
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message, data: null };
    }
};

export const getNewAccessTokenWithRefreshToken = async (refreshToken) => {
    try {
        const response = await axios.post(`${API_URL}token/refresh/`, {
            refresh: refreshToken,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};