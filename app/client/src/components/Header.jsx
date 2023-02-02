import { Link } from "react-router-dom";
export function Header() {
  return (
    <header className="flex">
      <img />
      <Link to="/account">Username</Link>
      <p>Score</p>
    </header>
  );
}
