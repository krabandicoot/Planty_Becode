import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => { // provides the authentication to the different components
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;