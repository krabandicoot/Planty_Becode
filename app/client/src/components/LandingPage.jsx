export function LandingPage() {

  return (
    <section className="flex flex-col ">
      <div className="flex flex-col justify-center mb-24">
        <button>
          <a href="/signin">
            Login
          </a>
        </button>
        <button>
          <a href="/signup">
            Sign Up
          </a>
        </button>
      </div>
      <p className="bg-Crayola/40 rounded-lg p-5 text-xs italic">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
        architecto tempore cum quia aperiam, soluta tempora?
      </p>
    </section >
  );
}
