import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => { // provides the authentication to the different components
    const [auth, setAuth] = useLocalStorage('user', null);
    console.log(auth);
    console.log(setAuth);
    const [players, setPlayers] = useState();
    const [player, setPlayer] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth, players, setPlayers, player, setPlayer }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;