import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

export default function RequireLayout() {

    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth)

    return (
        auth ?
            <main className=" ml-8 mr-8">
                <Outlet />
            </main >
            : <Navigate to='/signin' state={{ from: location }} replace />
    );
}
