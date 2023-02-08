import React, { useState, useRef, useEffect } from "react";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ColorPicker from "./PickColor";
import useAuth from "../hooks/useAuth";
import { FaEye } from 'react-icons/fa';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,29}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,254}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[a-z]{2,4}$/;
const REGISTER_URL = "/api/user/signup";

//icon eye
const eyeIcon = <FaEye />

export function SignUp() {

    const { setAuth } = useAuth();

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();


    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    // display picker color
    const [isShownPicker, setIsShownPicker] = useState(false);
    const [isShownForm, setIsShownForm] = useState(true);

    // visibility password
    const [passwordVisible, setPasswordVisible] = useState(false);

    //color user -> PickColor
    const [color, setColor] = useState("");


    const chooseColor = (color) => {
        setColor(color);
    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg("");
    }, [username, email, password, matchPassword])

    // display picker color event
    const handleClickVisibility = event => {
        setIsShownPicker(current => !current);
        setIsShownForm(current => !current);
    }

    // avoid keypress enter
    const checkKeyDown = (e) => {
        if (e.keyCode === 13) e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // verification
        const v1 = USER_REGEX.test(username);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);
        const v4 = color;
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, email, password, color }),
                {
                    headers: { 'Content-Type': 'application/json' }

                })

            console.log(response?.data);
            console.log(response?.data?.usernam);
            // console.log(response?.accessToken);
            // console.log(JSON.stringify(response))
            setAuth(response?.data?.username);
            // setSuccess(true);
            setUsername("");
            setEmail("");
            setPassword("");
            setMatchPassword("");
            setColor("");

            navigate("/map", { replace: true });

        } catch (err) {
            // console.log(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        };
    }


    return (
        <section className="signup__container-form relative -z-11 bg-zinc-200/[0.2] p-[20px] rounded-xl">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form method="POST" className="signup_form" onSubmit={handleSubmit} onKeyDown={(e) => checkKeyDown(e)}>
                {/* username */}
                <div style={{ display: isShownForm ? 'block' : 'none' }}>
                    < div className="signup__form-username relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-invalid={validUsername ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                            className="block py-2.5 px-0 w-full text-sm text-SmokyBlack bg-transparent border-0 border-b-[1px] border-zinc-200 appearance-none dark:text-Magnolia dark:border-gray-600 dark:focus:border-Crayola/60 focus:outline-none focus:ring-0 focus:border-zinc-200 peer"
                            placeholder=" " />
                        <label
                            htmlFor="username"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-SmokyBlack peer-focus:dark:text-Magnolia peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username
                        </label>
                        <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                            {/* mettre icon */}
                            4 to 30 characters, only letters and numbers<br />
                        </p>
                    </div>
                    {/* email */}
                    <div className="signup__form-email relative z-0 w-full mb-6 group">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-SmokyBlack bg-transparent border-0 border-b-[1px] border-zinc-200 appearance-none dark:text-Magnolia dark:border-gray-600 dark:focus:border-Crayola/60 focus:outline-none focus:ring-0 focus:border-zinc-200 peer"
                            placeholder=" " />
                        <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-SmokyBlack peer-focus:dark:text-Magnolia peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            {/* mettre icon */}
                            invalid email address<br />
                        </p>
                    </div>
                    {/* password */}
                    <div className="signup__form-password relative z-0 w-full mb-6 group">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            className="block py-2.5 px-0 w-full text-sm text-SmokyBlack bg-transparent border-0 border-b-[1px] border-zinc-200 appearance-none dark:text-Magnolia dark:border-gray-600 dark:focus:border-Crayola/60 focus:outline-none focus:ring-0 focus:border-zinc-200 peer"
                            placeholder=" " />
                        <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            {/* mettre icon */}
                            8 characters minimum, with an uppercase, a number and a symbol: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                        </p>
                        <label
                            htmlFor="password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-SmokyBlack peer-focus:dark:text-Magnolia peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Choose password
                        </label>
                        {/* button visibility password */}
                        <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute top-0 right-0 w-min">{eyeIcon}</button>
                    </div>
                    {/* confirm password */}
                    <div className="signup__form-repeat_password relative z-0 w-full mb-6 group">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className="block py-2.5 px-0 w-full text-sm text-SmokyBlack bg-transparent border-0 border-b-[1px] border-zinc-200 appearance-none dark:text-Magnolia dark:border-gray-600 dark:focus:border-Crayola/60 focus:outline-none focus:ring-0 focus:border-zinc-200 peer"
                            placeholder=" " />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            {/* mettre icon */}
                            Must match the first password input field.
                        </p>
                        <label
                            htmlFor="floating_repeat_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-SmokyBlack peer-focus:dark:text-Magnolia peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password
                        </label>
                        {/* button visibility password */}
                        <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute top-0 right-0 w-min">{eyeIcon}</button>
                    </div>
                    {/* button choose color */}
                    <button
                        type="button"
                        disabled={!validUsername || !validEmail || !validPassword || !validMatch ? true : false}
                        onClick={handleClickVisibility}
                        className="text-SmokyBlack bg-Crayola/40 hover:bg-Crayola focus:outline-none focus:ring-2 border-none focus:ring-Crayola font-medium rounded-3xl text-sm w-[215px] px-5 py-2.5 text-center dark:bg-Crayola dark:hover:bg-GreenPantum dark:focus:ring-DarkSpringGreen">Color</button>
                </div>
                {/* picker Color */}
                <div style={{ display: isShownPicker ? 'block' : 'none' }}>
                    <ColorPicker chooseColor={chooseColor} />
                </div>
            </form>
            <p style={{ display: isShownForm ? 'block' : 'none' }}>
                Already registered?<br />
                <span className="line">
                    <a href="/signin">Sign In</a>
                </span>
            </p>
        </section>
    )
}

