import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    return token ? children : null;
}

export const ProtectRoute = ({ children }) => {
    const navigate = useNavigate();
    const username = useAuthStore(state => state.auth.username);
    
    useEffect(() => {
        if (!username) {
            navigate('/');
        }
    }, [username, navigate]);
    
    return username ? children : null;
}
