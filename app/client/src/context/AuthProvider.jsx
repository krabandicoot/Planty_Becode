import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "../api/axios";
const PLAYER_URL = "/api/account/username/";
const TREES_URL = "/api/tree/all/";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => { // provides the authentication to the different components
    const [auth, setAuth] = useLocalStorage('user', null);
    const [players, setPlayers] = useState();
    const [player, setPlayer] = useState({});

    const [trees, setTrees] = useState([]);

    useEffect(() => {
        let isMounted = true; // mounted true = the component is loaded to the site
        const controller = new AbortController();

        const getPlayer = async () => {
            try {
                const { data: response } = await axios.get(PLAYER_URL + auth);
                isMounted && setPlayer(response);

            } catch (err) {
                console.log(err);
            }
        }
        getPlayer();

        const getTreesByOwner = async () => {
            try {
                const { data: response } = await axios.get(TREES_URL);
                isMounted && setTrees(response);
                console.log(response);

            } catch (err) {
                console.log(err);
            }
        }

        getTreesByOwner();

        return () => { // we clean up function of the useEffect
            isMounted = false; // means we don't mount the component and 
            controller.abort();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth, players, setPlayers, player, setPlayer, trees, setTrees }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;