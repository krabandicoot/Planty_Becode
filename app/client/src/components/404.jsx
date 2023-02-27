import { Link } from "react-router-dom";
export function NothingPage() {
    return (
        <section className="flex flex-col justify-center items-center gap-8">
            <h1>Oops, we got lost.</h1>
            <button>
                <Link to="/map">Back to Map</Link>
            </button>
        </section>
    )
}