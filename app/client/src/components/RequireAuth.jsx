import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {

    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth)

    return (
        auth// checks to see if there is a user or not
            ? <Outlet />
            : <Navigate to='/signin' state={{ from: location }} replace />   // if yes, we return the outlet
        //we send the user to the login page and replaces the current location with the one we want ie signin
    );
}
