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
            <div className="tree__card--header flex justify-between">
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
            <div className="tree__card--container">
                <div className="tree__card bg-Magnolia p-2 w-24 flex flex-col items-center rounded-md">
                    <p>Tree Title</p>
                    <img src="../src/images/icon-tree.png" alt="Tree Picture" className="w-[50px]" />
                </div>
            </div>
            <div className="text-sm">
                <div className="flex gap-2">
                    <h4>Your data </h4>
                    <a><MdOutlineModeEditOutline /></a>
                </div>
                <div className="flex gap-2">
                    <p>Username</p>
                    <p>{player.username}</p>
                </div>
                <div className="flex gap-2">
                    <p>Email</p>
                    <p>{player.email}</p>
                </div>
                <div className="flex gap-2">
                    <p>Description</p>
                    <p>{player.bio}</p>
                </div>
            </div>
        </section>
    )
}

