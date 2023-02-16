import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { BiCommentAdd } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr"

import axios from "../api/axios";
const COMMENT_URL = "api/comment/create/";

export function Comments() {
    const { auth } = useAuth();

    const { singleTree } = useAuth();

    const tree_id = singleTree._id;

    const [comments, setComments] = useState(false);

    const [username, setUsername] = useState(auth);
    const [text, setText] = useState("");

    const [commentsForm, setCommentsForm] = useState(false);

    const postComment = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(COMMENT_URL + tree_id,
                JSON.stringify({ username, text }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                })

            setText("");
            console.log(response.data)

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <section className="bg-Magnolia drop-shadow pl-8 rounded-t">
            {/* Title */}
            <a
                className="focus:text-SmokyBlack hover:text-SmokyBlack"
                onClick={() => { comments === false ? setComments(true) : setComments(false) }}>
                <h4 className="text-center p-1">Comments</h4>
            </a>
            {/* Comments Section */}

            <div className={comments ? "visible flex gap-2" : "hide"}>
                {commentsForm === false ?
                    <>
                        <div className="text-sm w-3/4 text-justify pb-2">
                            {singleTree.comments?.length ?
                                singleTree.comments.map((comment, id) =>
                                    <div key={id} className="flex flex-col justify-around gap-2 rounded-xl p-1 text-xs">
                                        <div className="flex gap-1 items-center">
                                            <p className="font-bold">{comment.username}</p>
                                        </div>
                                        <p>
                                            {comment.text}
                                        </p>
                                    </div>)
                                : <p> No comments yet</p>
                            }
                        </div>
                        {/* Add comment button */}
                        <button
                            className="button__lock opacity-none w-10 h-10 rounded-full bg-Crayola flex flex-col justify-center self-center items-center"
                            onClick={() => setCommentsForm(true)}
                        >
                            <BiCommentAdd />
                        </button>
                    </>
                    :
                    <form method="POST" className="comment__form" onSubmit={postComment}>
                        <div className="text-xs flex flex-col">
                            <button
                                className="button__lock opacity-none w-6 h-6 rounded-full bg-Crayola flex flex-col justify-center items-center self-end"
                                onClick={() => setCommentsForm(false)}
                            >
                                <GrFormClose />
                            </button>
                            <label htmlFor="username"></label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={() => setUsername(username)}
                                className="font-bold bg-transparent m-2"
                            />
                            <label htmlFor="text"></label>
                            <textarea
                                type="text"
                                name="text"
                                cols="40"
                                rows="5"
                                maxLength={250}
                                placeholder="Comment the tree..."
                                className="rounded-md p-2"
                                onChange={(e) => setText(e.target.value)}>
                            </textarea>
                            <button
                                type="submit"
                                className="w-min bg-Crayola m-4 self-end">
                                Submit
                            </button>
                        </div>
                    </form>
                }
            </div>
        </section >
    )
}