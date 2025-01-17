import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem("authTokens") ? 
        JSON.parse(localStorage.getItem("authTokens"))
        : null
    );

    const [user, setUser] = useState(
        localStorage.getItem("authTokens") ? 
        jwtDecode(localStorage.getItem("authTokens"))
        : null
    );

    const [loading, setLoading] = useState(true);

    const loginUser = async (email, password) => {
        let url = "http://127.0.0.1:8000/api/token/";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
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
        } else {
            console.error("An Error Occured");
            swal.fire({
                title: "No Account Found",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'bottom-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    };

    const registerUser =  async (data) => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/register/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resdata = await response.json();

        if (response.status === 201) {
            swal.fire({
                title: "Registration Success",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'bottom-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
        } else {
            console.error("An Error Occured");
            console.log(data);
            swal.fire({
                title: "There was a server error",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'bottom-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        swal.fire({
            title: "You have been logged out",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'bottom-right',
            timerProgressBar: true,
            showConfirmButton: false
        });
    };

    useEffect(() => {
        const checkTokenValidity = () => {
            if (authTokens) {
                const { exp } = jwtDecode(authTokens.access);
                if (Date.now() >= exp * 1000) {
                    // Clear authTokens and end the session if the token is expired
                    setAuthTokens(null);
                    setUser(null);
                    localStorage.removeItem("authTokens");
                    swal.fire({
                        title: "Your session has expired",
                        icon: "error",
                        toast: true,
                        timer: 6000,
                        position: 'bottom-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                }
            }
        };

        checkTokenValidity();
        setLoading(false);
    }, [authTokens]);

    return (
        <AuthContext.Provider value={{ user, setUser, authTokens, setAuthTokens, registerUser, loginUser, logoutUser }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
