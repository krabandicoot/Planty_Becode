import Lottie from "lottie-react";
import animationData from '../lotties/logo-Planty.json';

export function Title() {

  return (
    <div className="container__title max-w-[300px] pt-10 pb-20">
      <h1 className="text-3xl top-10 flex flex-col text-left">
        <span>Welcome to</span>
        <span className="block relative left-32 max-w-min">Plant</span>
        <Lottie className="container__title-logo absolute w-[150px] top-[20px] left-[145px]" animationData={animationData} loop={false} />
      </h1>
    </div >
  );
}
