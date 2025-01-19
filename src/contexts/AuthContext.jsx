import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import swal from 'sweetalert2';
import { getNewAccessTokenWithRefreshToken } from "src/services/authService"

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem("access") || null
    );

    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem("refresh") || null
    );

    const [user, setUser] = useState( localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")) || null);

    const [loading, setLoading] = useState(true);

    const loginUser = async (email, password) => {
        setLoading(true);
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        setLoading(false);
        if (response.status === 201 || response.status === 200) {
            setUser(data.user);
            setRefreshToken(data.refresh);
            setAuthTokens(data.access);
            localStorage.setItem("user", data.data);
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            swal.fire({
                title: "Login Success",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'bottom-right',
                customClass: {
                    popup: 'swal-popup',
                    container: 'swal-container',
                    title: 'swal-title',
                    icon: 'swal-icon'
                },
                timerProgressBar: true,
                showConfirmButton: false
            });
            return true
        } else {
            console.log("An Error Occured");
            swal.fire({
                title: "No Account Found",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'bottom-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
            return false
        }
    };

    const registerUser =  async (data) => {
        setLoading(true);

        let url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/register/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resdata = await response.json();
        setLoading(false);

        if (response.status === 201 || response.status === 200) {
            swal.fire({
                title: "Registration Success!",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'bottom-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
            return true 
        } else {
            console.log(resdata);
            swal.fire({
                title: "There was a server error",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'bottom-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
            return false
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        setRefreshToken(null);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        swal.fire({
            title: "You have been logged out",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'bottom-right',
            timerProgressBar: true,
            showConfirmButton: false
        });
        window.location.reload();
    };

    useEffect(() => {
        const checkTokenValidity = async () => {
            if (refreshToken) { 
                await getNewAccessTokenWithRefreshToken(refreshToken).then((res) => {
                    if (!res) return logoutUser()
                    console.log('getNewAccessTokenWithRefreshToken => ', jwtDecode(res.access), jwtDecode(res.refresh));
                    localStorage.setItem("access", (res.access));
                    localStorage.setItem("refresh", (res.refresh));
                })
            }
        };

        checkTokenValidity();
        setLoading(false);
    }, [refreshToken]);

    return (
        <AuthContext.Provider value={{ user, setUser, authTokens, setAuthTokens, registerUser, loginUser, logoutUser }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);