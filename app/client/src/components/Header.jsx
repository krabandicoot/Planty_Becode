import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animationData from '../lotties/logo-Planty.json';
import { AiOutlineUser } from "react-icons/ai";
import useAuth from "../hooks/useAuth";

export function Header() {
  const { auth } = useAuth();
  return (
    <header className="header text-xs flex justify-between mb-4 ml-8 mr-8">
      {/* Logo + redirects*/}
      <div className="header__logo flex">
        <Link to="/map">
          <p>Plant</p>
          <Lottie className="container__title-logo absolute w-[45px] left-[35px] top-[10px]" animationData={animationData} loop={false} />
        </Link>
      </div>

      {/* User */}
      <div className="header__user flex gap-3">
        {/* Username + redirect */}
        <div className="header__user--name">
          <Link to="/account" className="items-center flex gap-1">
            <p><AiOutlineUser /></p>
            <p>{auth}</p>
          </Link>
        </div>
        {/* Score */}
        <div className="header__user--score flex gap-1">
          <img src="../src/images/icon-leaf.png" alt="Leaf score icon" className="w-[10px]" />
          <p>Score</p>
        </div>
      </div>

    </header >
  );
}
