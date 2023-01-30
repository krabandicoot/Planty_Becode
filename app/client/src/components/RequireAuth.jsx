import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth?.user // checks to see if there is a user or not
            ? <Outlet /> // if yes, we return the outlet
            : <Navigate to='/signin' state={{ from: location }} replace /> //we send the user to the login page and replaces the current location with the one we want ie signin
    );
}

export default RequireAuth; 