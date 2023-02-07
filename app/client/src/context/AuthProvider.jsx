import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => { // provides the authentication to the different components
    const [auth, setAuth] = useLocalStorage("user", null);
    const [players, setPlayers] = useState();

    return (
        <AuthContext.Provider value={{ auth, setAuth, players, setPlayers, }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;