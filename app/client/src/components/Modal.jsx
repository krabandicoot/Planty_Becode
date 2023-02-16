import React from "react";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className="absolute z-10 bg-DarkSpringGreen rounded-md m-14 w-[50%] opacity-90">
          <RiCloseLine className= "m-2" onClick={() => setIsOpen(false)}/>
        <p>
          Helloooooo !
        </p>
      </div>
    </>
  );
};

export default Modal;