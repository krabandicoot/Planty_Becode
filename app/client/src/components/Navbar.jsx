import { Link } from "react-router-dom";
import { AiOutlineInfoCircle, AiOutlineTrophy, AiOutlineUser, AiOutlineHistory } from "react-icons/ai";
import { CgTrees } from "react-icons/cg";

export function Navbar() {

    return (
        <nav className="nav flex">
            <Link to="/map"><CgTrees /></Link>
            <Link to="/leaderboard"><AiOutlineTrophy /></Link>
            <Link to="/gamelog"><AiOutlineHistory /></Link>
            <Link to="/gamerules"><AiOutlineInfoCircle /></Link>
            <Link to="/account"><AiOutlineUser /></Link>
        </nav>
    )
}