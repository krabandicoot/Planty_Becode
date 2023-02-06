import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animationData from '../lotties/logo-Planty.json';
import { AiOutlineUser } from "react-icons/ai";
export function Header() {
  return (
    <header className="flex">
      <div className="flex">
        <p className="block relative max-w-min">Plant</p>
        <Lottie className="container__title-logo absolute w-[15px] top-[2px]" animationData={animationData} loop={false} />
      </div>
      <div>
        <p><AiOutlineUser />  </p>
        <Link to="/account">Username</Link>
      </div>

      <div className="flex">
        <img src="../src/images/icon-leaf.png" alt="Leaf score icon" className="w-[10px]" />
        <p>Score</p>
      </div>

    </header>
  );
}
