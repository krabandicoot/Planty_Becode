import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animationData from '../lotties/logo-Planty.json';
import { AiOutlineUser } from "react-icons/ai";
import useAuth from "../hooks/useAuth";

export function Header() {
  const { auth } = useAuth();
  return (
    <header className="header text-xs flex justify-between mb-10">
      {/* Logo */}
      <div className="header__logo flex">
        <p>Plant</p>
        <Lottie className="container__title-logo absolute w-[45px] left-[35px] top-[10px]" animationData={animationData} loop={false} />
      </div>
      <div className="header__user flex gap-3">
        {/* User */}
        <div className="header__user--name items-center flex gap-1">
          <p><AiOutlineUser />  </p>
          <Link to="/account">{auth}</Link>
        </div>
        {/* Score */}
        <div className="header__user--score flex gap-1">
          <img src="../src/images/icon-leaf.png" alt="Leaf score icon" className="w-[10px]" />
          <p>Score</p>
        </div>
      </div>

    </header>
  );
}
