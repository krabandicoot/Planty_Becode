import useAuth from "../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom";
import { IoLockClosed } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { useState } from "react";

export function Tree() {
    const { player } = useAuth();
    const { trees } = useAuth();

    const [treeStatus, setTreeStatus] = useState();

    const navigate = useNavigate();
    const to = "/"

    return (
        <section className="tree__comments relative ml-8 grid grid-rows-3 grid-cols-2 bg-Magnolia">

            <div className="row-start-2 col-start-1 self-end">
                <h1 className="text-2xl">tree.name</h1>
                <div className="text-xs">
                    <p>Owner : tree.owner</p>
                    <Link to={to} replace>Link to tree.wikipedia</Link>
                </div>

            </div>

            <img
                src="../src/images/icon-tree.png"
                alt="tree picture"
                className="absolute col-start-2 z-10 cropped-image fill-image" />

            {/* Condition to display the button according to tree status */}
            <div className="flex flex-col col-start-1 row-start-3 row-end-4 self-center">
                <div className="button__buy">
                    <button className="absolute h-10 w-[150px] text-SmokyBlack">Buy Tree</button>
                    <span className="relative top-0 left-[110px] w-10 h-10 rounded-full bg-Crayola/80 flex flex-col justify-center items-center text-[10px]">
                        <img src="../src/images/icon-leaf.png" alt="leaf-icon" className="h-[20px] rotate-90 pl-2" />
                        <p>250</p>
                    </span>
                </div>
                {/* 
                <div className="button__purchased">
                    <button className="absolute h-10 w-[150px] bg-Grey/40 text-SmokyBlack">Your Tree</button>
                    <span className="relative top-0 left-[110px] w-10 h-10 rounded-full bg-Grey/50 flex flex-col justify-center items-center">
                        <IoLockClosed />
                    </span>
                </div>

                <div className="button-locked">
                    <button className="absolute h-10 w-[150px] text-SmokyBlack">Your Tree</button>
                    <span className="relative top-0 left-[110px] w-10 h-10 rounded-full bg-Crayola/80 flex flex-col justify-center items-center text-green-800">
                        <MdOutlineDone />
                    </span>
                </div> */}
            </div>
        </section>

    )
}