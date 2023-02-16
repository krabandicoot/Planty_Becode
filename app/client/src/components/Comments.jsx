import { useState } from "react";
import useAuth from "../hooks/useAuth"

export function Comments() {

    const { player } = useAuth();

    const [comments, setComments] = useState(false);
    return (
        <section className="bg-Magnolia drop-shadow pl-8 rounded-t">

            {/* <h4 "> */}
            <a
                className="focus:text-SmokyBlack hover:text-SmokyBlack"
                onClick={() => { comments === false ? setComments(true) : setComments(false) }}>
                <h4 className="text-center p-1">Comments</h4>
            </a>
            {/* </h4> */}
            <div className={comments ? " display" : "hide"}>
                <ul className="text-sm w-3/4 text-justify">
                    {/* {comments
                        .map((comment, id) => */}
                    <li className="flex flex-col justify-around gap-2 rounded-xl p-1 text-xs">
                        <div className="flex gap-1 items-center">
                            <p className="font-bold">{player?.username}</p>
                            <div className="player__color w-2 h-2 rounded-full"
                                style={{ backgroundColor: player.color }}>
                            </div>
                        </div>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ipsa reiciendis voluptatibus, impedit consequuntur assumenda doloremque quo sed?</p>
                    </li>
                    {/* )} */}
                </ul>
            </div>
        </section >
    )
}