export function Navbar() {

    return (
        <nav className="nav">
            <ul>
                <li>
                    <a href="/map">
                        Map
                    </a>
                </li>
                <li>
                    <a href="/leaderBoard">Leaderboard</a>
                </li>
                <li>
                    <a href="/gamelog">Gamelog</a>
                </li>
                <li>
                    <a href="/gamerules">Gamerules</a>
                </li>
                <li>
                    <a href="/account">Account</a>
                </li>
            </ul>
        </nav >
    )
}