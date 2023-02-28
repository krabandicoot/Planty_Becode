import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animationData from '../lotties/logo-Planty.json';

export function Title() {

  return (
    <header className="container__title max-w-[300px] pt-[40px] ml-8 mb-10 self-end">
      <Link to="/">
        <h1 className="text-3xl top-10 flex flex-col text-left">
          <span>Welcome to</span>
          <span className="block relative left-32 max-w-min">Plant</span>
          <Lottie className="container__title-logo absolute w-[150px] top-[20px] left-[145px]" animationData={animationData} loop={false} />
        </h1>
      </Link>
    </header >
  );
}
