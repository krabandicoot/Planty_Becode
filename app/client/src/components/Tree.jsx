import useAuth from "../hooks/useAuth"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { IoLockClosed } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { useEffect, useState } from "react";

import axios from "../api/axios";
const SINGLE_TREE_URL = "api/tree/"; // + insert tree name

export function Tree() {
    const { tree } = useAuth();
    const { name } = useParams();


    const [singleTree, setSingleTree] = useState([]);
    const [treeStatus, setTreeStatus] = useState();

    const to = "/"

    useEffect(() => {
        let isMounted = true; // mounted true = the component is loaded to the site
        const controller = new AbortController();

        const getSinglreTree = async () => {
            try {
                const response = await axios.get(SINGLE_TREE_URL + name);
                isMounted && setSingleTree(response.data[0]);
            } catch (err) {
                console.log(err);
            }
        }
        getSinglreTree();

        return () => { // we clean up function of the useEffect
            isMounted = false; // means we don't mount the component and 
            controller.abort();
        }
    }, [])

    console.log(singleTree);

    return (
        <section className="tree__comments relative ml-8 grid grid-rows-3 grid-cols-2 bg-Magnolia">

            <div className="row-start-2 col-start-1 self-end capitalize">
                <h1 className="text-2xl">{singleTree.name}</h1>
                <div className="text-xs">
                    <p>Owner : {singleTree.owner}</p>
                    <p>Species : {singleTree.species}</p>
                    <Link
                        className="underline text-"
                        to={{
                            pathname: singleTree.wikilink
                        }}
                        target="_blank">Wikipedia</Link>
                </div>
            </div>

            <img
                src="../src/images/icon-tree.png"
                alt="tree picture"
                className="absolute col-start-2 z-10 cropped-image fill-image" />
            {/* Condition to display the button according to tree status */}


            <div className="flex flex-col col-start-1 row-start-3 row-end-4 self-center">
                {singleTree.value === "available" ?
                    <div className="button__buy">
                        <button className="absolute h-10 w-[150px] text-SmokyBlack">Buy Tree</button>
                        <span className="relative top-0 left-[110px] w-10 h-10 rounded-full bg-Crayola/80 flex flex-col justify-center items-center text-[10px]">
                            <img src="../src/images/icon-leaf.png" alt="leaf-icon" className="h-[20px] rotate-90 pl-2" />
                            <p>{singleTree.price}</p>
                        </span>
                    </div>
                    :
                    (
                        singleTree.value === "unvailable" ?
                            <div className="button__purchased">
                                <button className="absolute h-10 w-[150px] bg-Grey/40 text-SmokyBlack">Your Tree</button>
                                <span className="relative top-0 left-[110px] w-10 h-10 rounded-full bg-Grey/50 flex flex-col justify-center items-center">
                                    <IoLockClosed />
                                </span>
                            </div>
                            :
                            <div className="button-locked">
                                <button className="absolute h-10 w-[150px] text-SmokyBlack">Your Tree</button>
                                <span className="relative top-0 left-[110px] w-10 h-10 rounded-full bg-Crayola/80 flex flex-col justify-center items-center text-green-800">
                                    <MdOutlineDone />
                                </span>
                            </div>
                    )
                }
            </div>
        </section>

    )
}