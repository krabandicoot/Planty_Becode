import useAuth from "../hooks/useAuth";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { IoLockClosed } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { Comments } from "./Comments";

import axios from "../api/axios";

// Get tree **
const SINGLE_TREE_URL = "/api/tree/"; // + insert tree name

// Buy a tree **
const BUY_TREE_URL = "/api/tree/buy/"; // + insert-tree-name

// Get price of a tree **
const PRICE_TREE_URL = "/api/tree/price/"; // + insert-tree-name

// Lock a tree **
const LOCK_TREE_URL = "/api/tree/lock/"; // + insert-tree-name

// Unlock a tree **
const UNLOCK_TREE_URL = "/api/tree/unlock/"; // + insert-tree-name

export function Tree() {
    const { player } = useAuth();
    const { singleTree, setSingleTree } = useAuth();
    const { name } = useParams("");

    console.log(name);

    const errRef = useRef();

    const [errMsg, setErrMsg] = useState("");
    const [priceTree, setPriceTree] = useState(singleTree.price);
    const [buyTree, setBuyTree] = useState();
    const [lockTree, setLockTree] = useState("");
    const [unlockTree, setUnlockTree] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || `/tree/${name}`;

    useEffect(() => {
        let isMounted = true; // mounted true = the component is loaded to the site
        const controller = new AbortController();

        const getSinglreTree = async () => {
            try {
                const response = await axios.get(SINGLE_TREE_URL + name);
                isMounted && setSingleTree(response.data[0]);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getSinglreTree();
        console.log(singleTree);

        return () => {
            // we clean up function of the useEffect
            isMounted = false; // means we don't mount the component and
            controller.abort();
        };
    }, []);
    const treename = singleTree.name;
    const username = player.username;

    // useEffect(() => {

    const displayPrice = async () => {
        // e.preventDefault();
        try {
            const configuration = {
                method: "post",
                url: PRICE_TREE_URL + name,
                data: {
                    treename,
                    username,
                },
                withCredentials: true,
            };
            const response = await axios(configuration);
            setPriceTree(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    displayPrice();

    // }, [treename, username])

    const handleBuy = async () => {
        try {
            const configuration = {
                method: "post",
                url: BUY_TREE_URL + name,
                data: {
                    username,
                    treename,
                },
                withCredentials: true,
            };

            const response = await axios(configuration);
            setBuyTree(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Lock the tree

    const handleLock = async (e) => {
        // e.preventDefault();

        try {
            const response = await axios.get(LOCK_TREE_URL + name);
            setLockTree(response.data);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("Oops, the server is not responding");
            } else if (err.response?.status === 204) {
                setErrMsg("Sorry, you need more leaves");
            }
            errRef.current.focus();
        }
    };

    // Unlock the tree
    const handleUnlock = async (e) => {
        // e.preventDefault();

        try {
            const response = await axios.get(UNLOCK_TREE_URL + name);
            console.log(response.data);
            setUnlockTree(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    console.log(singleTree);

    return (
        <section className="tree__comments h-screen  bg-Magnolia ">
            <div className="relative max-h-fit pl-8 grid grid-rows-4 grid-cols-2">
                <div className="row-start-2 col-start-1 self-end capitalize">
                    <h1 className="text-2xl">{singleTree.name}</h1>
                    <div className="text-xs text-DarkSpringGreen leading-6">
                        <p>Owner : {singleTree.owner}</p>
                        <p>Species : {singleTree.species}</p>
                        <p className="flex items-baseline gap-2 ">
                            Value : {singleTree.price}
                            <img
                                src="/icon-leaf.png"
                                alt="leaf-icon"
                                className="h-[20px] rotate-90 self-center"
                            />
                        </p>
                        <Link
                            className="underline text-DarkSpringGreen font-bold italic"
                            to={{
                                pathname: singleTree.wikilink,
                            }}
                            target="_blank"
                        >
                            Wikipedia
                        </Link>
                    </div>
                </div>
                <img
                    src="/icon-tree.png"
                    alt="tree picture"
                    className="absolute col-start-2 cropped-image fill-image"
                />
                <div className="flex flex-col col-start-1 row-start-3 row-end-4 self-center">
                    {singleTree.value === "unavailable" &&
                    singleTree.owner === player.username ? (
                        <div div className="button__purchased flex gap-2">
                            <button className="absolute h-10 w-[150px] text-SmokyBlack">
                                Your Tree
                            </button>
                            <span className="relative top-0 left-[110px] w-10 h-10 rounded-full bg-Crayola/80 flex flex-col justify-center items-center text-green-800">
                                <MdOutlineDone />
                            </span>
                            <button
                                className="button__lock opacity-none relative top-0 left-[110px] w-10 h-10 rounded-full bg-Grey flex flex-col justify-center items-center"
                                onClick={handleLock}
                            >
                                <IoLockClosed />
                            </button>
                            <p
                                ref={errRef}
                                className={"errMsg" ? "errmsg" : "offscreen"}
                            >
                                {errMsg}
                            </p>
                        </div>
                    ) : singleTree.value === "locked" &&
                      singleTree.owner === player.username ? (
                        <div className="button-locked flex gap-2">
                            <button className="absolute h-10 w-[150px] bg-Grey/40 text-SmokyBlack">
                                Locked
                            </button>
                            <span className="relative top-0 left-[110px] w-10 h-10 rounded-full bg-Grey/50 flex flex-col justify-center items-center">
                                <IoLockClosed />
                            </span>
                            <a
                                className="text-xs text-DarkSpringGreen relative top-0 left-[110px] flex items-center"
                                onClick={handleUnlock}
                            >
                                Unlock
                            </a>
                        </div>
                    ) : (
                        <div div className="button__buy">
                            <button
                                className="absolute h-10 w-[150px] text-SmokyBlack"
                                onClick={handleBuy}
                            >
                                Buy Tree
                            </button>
                            <span className="relative top-0 left-[110px] w-10 h-10 rounded-full bg-Crayola/80 flex flex-col justify-center items-center text-[10px]">
                                <img
                                    src="/icon-leaf.png"
                                    alt="leaf-icon"
                                    className="h-[20px] rotate-90 pl-2"
                                />
                                <p onLoad={() => displayPrice()}>{priceTree}</p>
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <Comments />
        </section>
    );
}
