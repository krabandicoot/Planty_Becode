import React from "react";
import { Link } from 'react-router-dom';

export function LandingPage() {

  return (
    <section className="flex flex-col">
      <div className="flex flex-col justify-center mt-10 mb-20 gap-2">
        <button>
          <Link to="signin">
            Login
          </Link>
        </button>
        <button>
          <Link to="signup">
            Sign Up
          </Link>
        </button>
      </div>
      <div>
        <p className="landingText rounded-lg p-5 mb-10 text-xs italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          architecto tempore cum quia aperiam, soluta tempora?
        </p>
      </div>
    </section>
  );
}
