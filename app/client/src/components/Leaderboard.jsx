import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import axios from "../api/axios";
const ACCOUNT_URL = "/api/account/leaderboard";

export function Leaderboard() {
    const { auth } = useAuth();
    const { players, setPlayers } = useAuth();

    useEffect(() => {
        let isMounted = true; // mounted true = the component is loaded to the site
        const controller = new AbortController();

        const getPlayers = async () => {
            try {
                const response = await axios.get(ACCOUNT_URL);
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

    console.log(players?.length)
    return (
        <section className="ml-8 mr-8">
            <div className="card__container mb-10">
                <h2 className="text-3xl mb-6">Leaderboard</h2>
                {players
                    ? (
                        <ul className="text-sm">
                            {players
                                .filter((player, id) => id < 10)
                                .map((player, id) =>
                                    <li key={id} className="flex items-center justify-around gap-2 mb-2 rounded-xl p-1"
                                        style={player.username === auth ? { backgroundColor: "#EAE6EC" } : { backgroundColor: "none" }} >
                                        <p>{id + 1}</p>
                                        <div className="player__color w-4 h-4 rounded-full"
                                            style={{ backgroundColor: player.color }}>
                                        </div>
                                        <p className="w-10">{player?.username}</p>
                                        <img src="../src/images/icon-leaf.png" alt="Leaf score icon" className="h-[20px]" />
                                        <p>{player?.leafs}</p>
                                        <img src="../src/images/icon-tree.png" alt="Leaf score icon" className="h-[20px]" />
                                        14
                                    </li>)}
                        </ul>
                    ) : <p>No players to display</p>
                }
            </div>
        </section >
    );
}
