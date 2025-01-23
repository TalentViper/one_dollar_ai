import { createContext, useState, useEffect, useContext } from "react";
import { useMatch, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { useAuth } from "./AuthContext";

const InviteContext = createContext();

export default InviteContext;

export const InviteProvider = ({ children }) => {
    const match = useMatch('/invite/:code');
    const navigate = useNavigate();
    const [inviteCode, setInviteCode] = useState(false);
    const [mustSignedInvitedUser, setMustSign] = useState(false);
    const { user } = useAuth();
    const [code, setCode] = useState(match?.params?.code || false);
    
    const createInvite = () => {
        setMustSign(false);
        swal.fire({
            title: "Invite Accepted!",
            icon: "success",
            timer: 6000,
            position: 'center',
            customClass: {
                popup: 'swal-popup',
                container: 'swal-container',
            },
            didClose: () => navigate('/', { replace: true })
        });
    };

    const clearInvite = () => {
        setInviteCode(false);
        setMustSign(false);
    };
    
    useEffect(() => {
        setMustSign(false)

        if (code && code.length > 5) {
            if (user && user.email) { // user exists, not accept invite
                setMustSign(false)
                // swal.fire({
                //     title: "couldn't accept invite!",
                //     icon: "warning",
                //     timer: 5000,
                //     position: 'center',
                //     customClass: {
                //         popup: 'swal-popup',
                //         container: 'swal-container',
                //     },
                //     didClose: () => navigate('/', { replace: true })
                // });
            } else {   // unsignined user
                if (mustSignedInvitedUser) return
                swal.fire({
                    title: "Please sign up",
                    icon: "info",
                    timer: 4000,
                    position: 'center',
                    customClass: {
                        popup: 'swal-popup',
                        container: 'swal-container',
                    },
                    didClose: () => {
                        setMustSign(true)
                    }
                });
            }
            setInviteCode(code)
        } else {
            clearInvite()
            if (match) {
                navigate('/', { replace: true })
            }
        }
    }, [code, user]);

    return (
        <InviteContext.Provider value={{ inviteCode, mustSignedInvitedUser, createInvite, clearInvite }}>
            {children}
        </InviteContext.Provider>
    );
};

export const useInviteInteraction = () => {
    const context = useContext(InviteContext);
    if (!context) {
        throw new Error("useInviteInteraction must be used within an InviteProvider");
    }
    return context;
}