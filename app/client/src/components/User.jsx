import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import axios from '../api/axios';
const ACCOUNT_URL = "/api/user/signout";

export function User() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const to = "/";

    const handleLogout = async (e) => {
        e.preventDefault();
        setAuth({});
        localStorage.clear();


        console.log("you are logged out");

        navigate(to, { replace: true });

    }
    return (
        <section>
            <h1>User</h1>
            <button className="Sign Out" onClick={handleLogout}></button>
        </section>
    )
}

