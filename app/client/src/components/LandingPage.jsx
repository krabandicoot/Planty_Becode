import React from "react";
import { Link } from 'react-router-dom';

export function LandingPage() {

  return (
    <section className="flex flex-col">
      <div className="flex flex-col justify-center mt-10 mb-20 gap-2 md:gap-6">
        <button className="signin__button">
          <Link to="signin" className="hover:">
            Login
          </Link>
        </button>
        <button className="signup__button">
          <Link to="signup">
            Sign Up
          </Link>
        </button>
        <p className="landingText rounded-lg p-5 mb-10 text-xs italic md:w-[300px]">
        "In a forest of a hundred thousand trees, no two leaves are alike."
        </p>
      </div>
    </section >
  );
}
