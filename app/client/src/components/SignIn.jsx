import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
const SIGNIN_URL = "/api/user/signin";


export function SignIn() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef(); // focus on user
    const errRef = useRef(); // focus on errors

    const [user, setUser] = useState(""); // corresponds to user input
    const [pwd, setPwd] = useState(""); // corresponds to pwd input
    const [errMsg, setErrMsg] = useState(""); // corresponds to error msg we might display
    const [success, setSuccess] = useState(false); // shows a success message 

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
                JSON.stringify({ user: username, pwd: password }),
                {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data.accessToken;
            //const roles = response?.data?.roles;
            setAuth({ user: username, pwd: password, accessToken });
            setUser("");
            setPwd("");
            setSuccess(true);

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
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go To Home</a>
                    </p>
                </section>
            ) : (

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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="username"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Username
                                </label>
                            </div>
                            {/* password */}
                            <div className="signin__form--password relative z-0 w-full mb-6 group">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    className="block py-2.5 px-0 w-full text-sm text-Magnolia bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="password"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Password
                                </label>
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
                                className="text-whitedark:text-SmokyBlack bg-Crayola/30                  hover:bg-DarkSpringGreen focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>
                        </form>

                        {/* no account redirect */}
                        <div className="flex items-center justify-center mt-6">
                            {/* put router link here*/}
                            <a href="signup">
                                <p className="ml-2 text-DarkSpringGreen">
                                    You don't have an account?
                                </p>
                            </a>
                        </div>
                    </div >
                </section>
            )}
        </>
    )
}