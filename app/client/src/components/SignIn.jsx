import { useRef, useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const SIGNIN_URL = "/api/user/signin";


export function SignIn() {
    const userRef = useRef(); // focus on user
    const errRef = useRef(); // focus on errors

    const eyeIcon = <FaEye />
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { setAuth } = useAuth;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [user, setUser] = useState(""); // corresponds to user input
    const [pwd, setPwd] = useState(""); // corresponds to pwd input
    const [errMsg, setErrMsg] = useState(""); // corresponds to error msg we might display

    useEffect(() => {
        userRef.current.focus()
    }, []) // sets the focus on the user input when the component loads

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]) // empties out the error message if the user changes the user or password state

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                SIGNIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data.accessToken;
            //const roles = response?.data?.roles;
            setAuth({ sername: user, password: pwd, signInToken: accessToken });
            setUser("");
            setPwd("");
            navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server Response");
            } else if (err.response?.satus === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.satus === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }

    }
    // TODO Remember me Checkbox

    return (
        <section>
            <p ref={errRef} className={"errMsg" ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <div className="signin__container--form">
                <form method="POST" className="signin__form" onSubmit={handleSubmit}>

                    {/* username */}
                    <div className="signin__form--username relative z-0 w-full mb-6 group" >
                        <input
                            type="text"
                            name="username"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-SmokyBlack bg-transparent border-0 border-b-[1px] border-zinc-200 appearance-none dark:border-gray-600 dark:focus:border-Crayola/60 focus:outline-none focus:ring-0 focus:border-zinc-200 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="username"
                            className="peer-focus:font-medium absolute text-sm text-SmokyBlack duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-SmokyBlack peer-focus:dark:text-Magnolia peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Username
                        </label>
                    </div>
                    {/* password */}
                    <div className="signin__form--password relative z-0 w-full mb-6 group">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-SmokyBlack bg-transparent border-0 border-b-[1px] border-zinc-200 appearance-none dark:border-gray-600 dark:focus:border-Crayola/60 focus:outline-none focus:ring-0 focus:border-zinc-200 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="password"
                            className="peer-focus:font-medium absolute text-sm text-SmokyBlack duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-SmokyBlack peer-focus:dark:text-Magnolia peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Password
                        </label>
                        <button onClick={() => setPasswordVisible(!passwordVisible)} className="absolute top-0 right-0">{eyeIcon}</button>
                    </div>
                    {/* Remember me checkbox */}
                    <div className="signin__form--checkbox flex gap-2 z-0 mb-6 group">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                        />
                        <label>Remember me</label>
                    </div>
                    {/* button sign up */}
                    <button
                        className="text-SmokyBlack bg-Crayola/40 hover:bg-Crayola focus:outline-none focus:ring-2 border-none focus:ring-Crayola font-medium rounded-3xl text-sm w-[215px] px-5 py-2.5 text-center dark:bg-Crayola dark:hover:bg-GreenPantum dark:focus:ring-DarkSpringGreen">Login</button>
                </form>

                {/* no account redirect */}
                <div className="flex items-center justify-center mt-6">
                    {/* put router link here*/}
                    <Link href="signup" className="ml-2 text-DarkSpringGreen">
                        You don't have an account?
                    </Link>


                </div>
            </div >
        </section>
    )
}
