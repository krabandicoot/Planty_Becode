import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireLayout() {

    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth);

    return (
        auth ?
            <main>
                <Outlet />
            </main >
            : <Navigate to='/signin' state={{ from: location }} replace />
    );
}
