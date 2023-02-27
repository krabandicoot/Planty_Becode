import { Link } from "react-router-dom";
import { AiOutlineInfoCircle, AiOutlineTrophy, AiOutlineUser, AiOutlineHistory } from "react-icons/ai";
import { CgTrees } from "react-icons/cg";
import useAuth from "../hooks/useAuth";

export function Navbar() {
    const { auth } = useAuth();

    return (
        <nav className="nav absolute bottom-6 flex w-full h-8 justify-around items-center text-xl bg-Magnolia/80 rounded-tl-md rounded-tr-md">
            <Link to="/map"><CgTrees /></Link>
            <Link to="/leaderboard"><AiOutlineTrophy /></Link>
            <Link to="/gamelog"><AiOutlineHistory /></Link>
            <Link to="/gamerules"><AiOutlineInfoCircle /></Link>
            <Link to={`/account/${auth}`}><AiOutlineUser /></Link>
        </nav >
    )
}