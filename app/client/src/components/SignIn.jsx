import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const SIGNIN_URL = "/api/user/signin";

const eyeIcon = <FaEye />

export function SignIn() {

    const { setAuth } = useAuth();

    const userRef = useRef(); // focus on user
    const errRef = useRef(); // focus on errors

    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/map";

    const [username, setUsername] = useState(""); // corresponds to user input
    const [password, setPassword] = useState(""); // corresponds to pwd input
    const [errMsg, setErrMsg] = useState(""); // corresponds to error msg we might display

    useEffect(() => {
        userRef.current.focus()
    }, []) // sets the focus on the user input when the component loads

    useEffect(() => {
        setErrMsg("");
    }, [username, password]) // empties out the error message if the user changes the user or password state

    const handleSubmit = async (e) => {
        e.preventDefault();

        const configuration = {
            method: 'post',
            url: SIGNIN_URL,
            data: {
                username,
                password
            },
            // withCredentials: true,
        }

        try {
            const response = await axios(configuration);

            const user = response?.data.username
            //console.log(user);
            setAuth(user);
            setUsername("");
            setPassword("");

            navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Wrong Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        };
    }


    // TODO Remember me Checkbox

    return (
        <section className="signin form__container mb-10 md:w-1/2 md:bg-transparent">
            <p ref={errRef} className={"errMsg" ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <form method="POST" className="signin__form" onSubmit={handleSubmit} >

                {/* username */}
                <div className="signin__form--username relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-SmokyBlack bg-transparent border-0 border-b-[1px] border-zinc-200 appearance-none dark:border-gray-600 dark:focus:border-Crayola/60 focus:outline-none focus:ring-0 focus:border-zinc-200 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="username"
                        className="peer-focus:font-medium absolute text-sm text-SmokyBlack duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-SmokyBlack peer-focus:dark:text-Magnolia peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Username
                    </label>
                </div >
                {/* password */}
                <div className="signin__form--password relative z-0 w-full mb-6 group">
                    <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-SmokyBlack bg-transparent border-0 border-b-[1px] border-zinc-200 appearance-none dark:border-gray-600 dark:focus:border-Crayola/60 focus:outline-none focus:ring-0 focus:border-zinc-200 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-SmokyBlack duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-SmokyBlack peer-focus:dark:text-Magnolia peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Password
                    </label>
                    <a onClick={() => setPasswordVisible(!passwordVisible)} className="absolute top-3 right-0">{eyeIcon}</a>
                </div>
                {/* Remember me checkbox */}
                <div div className="signin__form--checkbox flex gap-2 z-0 mb-6 group">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                    />
                    <label>Remember me</label>
                </div>
                {/* button sign up */}
                <div className="flex justify-center mb-2">
                    <button>
                        Login
                    </button>
                </div>

            </form>

            {/* no account redirect */}
            < div className="flex items-center justify-center mt-6" >
                <Link to="/signup" className="ml-2 text-DarkSpringGreen text-sm font-semibold" replace>
                    You don't have an account?
                </Link>
            </div >
        </section >
    )
}
