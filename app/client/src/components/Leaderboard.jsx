import { useState, useEffect } from "react";

import axios from "../api/axios";
const ACCOUNT_URL = "/api/account/leaderboard";

export function Leaderboard() {
    const [players, setPlayers] = useState();
    useEffect(() => {
        let isMounted = true; // mounted true = the component is loaded to the site
        const controller = new AbortController();

        const getPlayers = async () => {
            try {

                const response = await axios.get(ACCOUNT_URL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setPlayers(response.data); // if the component is mounted then set the player data with the data we fetch
            } catch (err) {
                console.log(err);
            }
        }
        getPlayers();

        return () => { // we clean up function of the useEffect
            isMounted = false; // means we don't mount the component and 
            controller.abort();
        }
    }, []);
    return (
        <section>
            <h1> Leaderboard</h1>
            {players?.length
                ? (
                    <ul>
                        {players.map((player, id) => <li key={id}>{player?.username}</li>)}
                    </ul>
                ) : <p>No players to display</p>
            }
        </section >
    );
}