import Lottie from "lottie-react";
import animationData from '../lotties/logo-Planty.json';

export function Title(){
      
      return (
        <div className="container__title flex flex-row relative">
          <h1 className="text-2xl">Welcome to <span>Plant</span></h1>
          <Lottie className="container__title-logo absolute h-[75px] right-[18px] top-[-34px]" animationData={animationData}
            loop={false}
          />
        </div>
      );
}
