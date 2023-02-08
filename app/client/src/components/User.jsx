import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md"
import { useState, useEffect } from "react";

import axios from "../api/axios";


export function User() {
    const { auth, setAuth } = useAuth();
    const { player, setPlayer } = useAuth();

    const navigate = useNavigate();
    const to = "/";

    useEffect(() => {
        let isMounted = true; // mounted true = the component is loaded to the site
        const controller = new AbortController();

        const getPlayer = async () => {
            let username = auth;
            const USER_URL = `/api/account/username/${username}`;

            try {
                const response = await axios.get(USER_URL);
                console.log(response.data);
                isMounted && setPlayer(response?.data);
            } catch (err) {
                console.log(err);
            }
        }
        getPlayer();

        return () => { // we clean up function of the useEffect
            isMounted = false; // means we don't mount the component and 
            controller.abort();
        }
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();

        const SIGNOUT_URL = "/api/user/signout";
        try {
            const response = await axios.get(SIGNOUT_URL);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }

        setAuth(null);
        localStorage.clear();

        console.log("you are logged out");

        navigate(to, { replace: true });
    };


    return (
        <section>
            <div className="player__header flex justify-between">
                <h2 className="text-3xl w-34 flex flex-col">Welcome, <span className="self-end leading-6">{player.username}!</span> </h2>
                <div className="flex gap-1 items-end">
                    <div className="flex gap-1">
                        <img src="../src/images/icon-leaf.png" alt="Leaf score icon" className="h-[18px]" />
                        <p>Score</p>
                    </div>
                    <button className="signout flex w-min h-min" onClick={handleLogout}>
                        <AiOutlineLogout className=" w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="player__tree">
                {/* add loop to display 5 tree cards */}
                <div className="player__tree--card bg-Magnolia p-2 w-24 flex flex-col items-center rounded-md">
                    <p>Tree Title</p>
                    <img src="../src/images/icon-tree.png" alt="Tree Picture" className="w-[50px]" />
                </div>
            </div>
            <form className="palyer__data text-sm">
                <div className="palyer__info--header flex gap-2">
                    <h4>Your data </h4>
                    <a><MdOutlineModeEditOutline /></a>
                </div>
                <div className="palyer__info--container flex gap-3">
                    <div className="palyer__info--title flex flex-col">
                        <label forHtml="username">Username</label>
                        <label forHtml="username">Email</label>
                        <label>Description</label>
                    </div>
                    <div className="palyer__info--data flex flex-col">
                        <input>{player.username}</input>
                        <input>{player.email}</input>
                        <input>{player.bio}</input>
                    </div>
                </div>
            </form >
        </section >
    )
}

