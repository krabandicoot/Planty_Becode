import useAuth from "../hooks/useAuth";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


import axios from "../api/axios";
const PLAYER_URL = "/api/account/username/";

export function EditUser({ setEdit }) {
    const { setAuth } = useAuth();
    const { player, setPlayer } = useAuth();
    const errRef = useRef();

    const [usernameEdit, setUsernameEdit] = useState(player.username);
    const [emailEdit, setEmailEdit] = useState(player.email);
    const [bioEdit, setBioEdit] = useState(player.bio);

    const [errMsg, setErrMsg] = useState(false);

    const navigate = useNavigate();
    const to = "/";

    const editPlayer = async () => {
        e.preventDefault();

        const configuration = {
            method: 'put',
            url: PLAYER_URL + player.username,
            data: {
                username: usernameEdit,
                email: emailEdit,
                bio: bioEdit
            },
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }

        try {
            const response = await axios(configuration);

            console.log(response?.data);
            setPlayer(response?.data);
            setAuth(response?.data.username)
            setEdit(false);
            setUsernameEdit("");
            setEmailEdit("");
            setBioEdit("");

        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg("No server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        };
    }

    return (
        <form method="post" onSubmit={editPlayer}>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="palyer__info--container flex gap-3 text-xs mb-4">
                <div className="palyer__info--title flex gap-y-2 flex-col">
                    <label htmlFor="username">Username</label>
                    <label htmlFor="email">Email</label>
                    <label htmlFor="text">Description</label>
                </div>
                <div className="text-SmokyBlack/50 palyer__info--data flex flex-col gap-y-2">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={usernameEdit || ''}
                        onChange={(e) => {
                            setEdit(true)
                            setUsernameEdit(e.target.value)
                        }}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={emailEdit || ''}
                        onChange={(e) => {
                            setEmailEdit(e.target.value)
                        }}
                        required
                    />
                    <textarea
                        type="text"
                        name="bio"
                        id="bio"
                        className="min-h-[100px] min-w-[150px]"
                        value={bioEdit || ''}
                        onChange={(e) => {
                            setBioEdit(e.target.value)
                        }}
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={(e) => {
                        setPlayer(e.target.value)
                    }}
                >
                    Cancel
                </button>
                <button
                    type="submit">
                    Save
                </button>

            </div>

        </form>
    )
}

