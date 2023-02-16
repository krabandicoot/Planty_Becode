import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Tree } from "./Tree";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className="absolute z-10 bg-DarkSpringGreen rounded-md m-14 w-[50%] opacity-90">
          <RiCloseLine className= "m-2" onClick={() => setIsOpen(false)}/>
          <div>
            <Tree/>
          </div>
      </div>
    </>
  );
};

export default Modal;