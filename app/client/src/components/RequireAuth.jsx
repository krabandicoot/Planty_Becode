import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {

    const { auth, setAuth } = useAuth();
    const location = useLocation();
    useEffect(() => {
        const signedInUser = localStorage.getItem('user');
        if (signedInUser) {
            setAuth(JSON.parse(signedInUser));
        }
    }, []);

    return (
        auth // checks to see if there is a user or not
            ? <Outlet /> // if yes, we return the outlet
            : <Navigate to='/signin' state={{ from: location }} replace /> //we send the user to the login page and replaces the current location with the one we want ie signin
    );
}; 