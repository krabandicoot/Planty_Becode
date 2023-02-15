import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md"
import { useState, useRef } from "react";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import axios from "../api/axios";
const PLAYER_URL = "/api/account/username/";
const SIGNOUT_URL = "/api/user/signout";

export function User() {
    const { auth, setAuth } = useAuth();
    const { player, setPlayer } = useAuth();
    const { userTrees } = useAuth();

    const errRef = useRef();


    const [errMsg, setErrMsg] = useState(false);
    const [edit, setEdit] = useState(false);
    const [dataPlayer, setDataPlayer] = useState({});

    const navigate = useNavigate();
    const to = "/";

    const handleLogout = async () => {
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

    const editPlayer = async () => {
        e.preventDefault();

        const configuration = {
            method: 'put',
            url: PLAYER_URL + player.username,
            data: {
                username,
                email,
                bio
            }
        }

        try {
            const response = await axios(configuration);
            setPlayer(response?.data);
            setAuth(response?.data.username)
            setEdit(false);

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

    const handleDelete = async () => {
        try {
            await axios.delete(PLAYER_URL + auth);
            navigate(to, { replace: true });

        } catch (err) {
            console.log(err)
            console.log("something went wrong");
        }
    }

    return (
        <section className="ml-8 mr-8">
            <div className="player__header flex justify-between mb-10">
                <h2 className="player__header--title text-3xl w-1/2 flex flex-col">Welcome, <span className="self-end leading-6">{player.username}!</span>
                </h2>
                <div className="flex items-end gap-4">
                    <div className="bg-Magnolia player__header--score flex gap-1 p-1 rounded-md text-xs items-center">
                        <img src="../src/images/icon-leaf.png" alt="Leaf score icon" className="rotate-90 h-[20px]" />
                        <p className="border-l border-solid border-SmokyBlack pl-2 pr-2">{player.leafs}</p>
                    </div>
                    <a className="bg-Red/80 w-min rounded-full p-1 player__header--signout flex h-min" onClick={handleLogout}>
                        <AiOutlineLogout className="text-white" />
                    </a>
                </div>
            </div>
            <Swiper
                // install Swiper modules
                modules={[Navigation, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            >

                {userTrees?.length ?
                    userTrees
                        .map((userTree, id) =>
                            <SwiperSlide
                                key={id}
                                onClick={() => navigate(`/tree/${userTree.name}`, { replace: true })}>
                                <p>{userTree.name}</p>
                                <img src="../src/images/icon-tree.png" alt="Tree Picture" className="w-[50px]" />
                            </SwiperSlide>
                        )
                    : <p>No Trees yet</p>
                }
            </Swiper>

            <div className="form__container player__data text-sm mt-10 mb-28 relative">
                <div className="player__color absolute w-10 h-10 rounded-full top-[-10px] right-[-10px]"
                    style={{ backgroundColor: player.color }}>
                </div>
                <div className="player__info--header flex items-center gap-2 text-lg">
                    <h4>Your data </h4>
                    <a onClick={() => { edit === false ? setEdit(true) : setEdit(false) }}>
                        <MdOutlineModeEditOutline />
                    </a>
                </div>
                <>
                    {edit === false ?
                        <div className="player__info--container flex gap-3 text-xs">
                            <div className="player__info--title flex flex-col gap-y-2">
                                <p>Username</p>
                                <p>Email</p>
                                <p>Description</p>
                            </div>
                            <div className="text-SmokyBlack/50 player__info--data flex flex-col gap-y-2">
                                <p>{player.username}</p>
                                <p>{player.email}</p>
                                <p>{player.bio}</p>

                            </div>
                        </div>
                        :
                        <form method="post" onSubmit={editPlayer}>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <div className="player__info--container flex gap-3 text-xs mb-4">
                                <div className="player__info--title flex gap-y-2 flex-col">
                                    <label htmlFor="username">Username</label>
                                    <label htmlFor="email">Email</label>
                                    <label htmlFor="text">Description</label>
                                </div>
                                <div className="text-SmokyBlack/50 player__info--data flex flex-col gap-y-2">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={player.username || ''}
                                        onChange={(e) => {
                                            setPlayer({ ...player, username: e.target.value })
                                        }}
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={player.email || ''}
                                        onChange={(e) => {
                                            setPlayer({ ...player, email: e.target.value })
                                        }}
                                        required
                                    />
                                    <textarea
                                        type="text"
                                        name="bio"
                                        id="bio"
                                        className="min-h-[100px] min-w-[150px]"
                                        value={player.bio || ''}
                                        onChange={(e) => {
                                            setPlayer({ ...player, bio: e.target.value })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPlayer(...player)
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
                    }
                </>
                <a onClick={handleDelete} className="text-Red/80 mt-2">Delete Account</a>

            </div >
        </section >
    )
}

