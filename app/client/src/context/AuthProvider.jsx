import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "../api/axios";

//user routes
const PLAYER_URL = "/api/account/username/";
const USER_TREES_URL = "api/account/username/tree/"; // + insert player name
//tree routes 
const TREES_URL = "/api/tree/all";
const BUY_TREE_URL = "api/tree/buy/"; // + insert tree name

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => { // provides the authentication to the different components
    const [auth, setAuth] = useLocalStorage('user', null);
    const [players, setPlayers] = useState();
    const [player, setPlayer] = useState({});

    const [trees, setTrees] = useState([]);
    const [singleTree, setSingleTree] = useState([]);
    const [userTrees, setUserTrees] = useState([]);

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

        const getTrees = async () => {
            try {
                const response = await axios.get(TREES_URL);
                isMounted && setTrees(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getTrees();

        const getTreesByOwner = async () => {
            try {
                const response = await axios.get(USER_TREES_URL + auth);
                //console.log(response.data)
                isMounted && setUserTrees(response.data[0].trees);
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
    //console.log(player);

    return (
        <AuthContext.Provider value={{ auth, setAuth, players, setPlayers, player, setPlayer, userTrees, setUserTrees, singleTree, setSingleTree }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;