import { useMemo, useState } from "react";
import type {
    ContextProviderProps,
    AuthContextType
} from "../types";
import { AuthContext } from "./AuthContext/AuthContext";

export default function ContextProvider({ children }: ContextProviderProps) {
    //token from LocalStorage
    const savedToken: string = localStorage.getItem("token") ?? ""
    //state for token
    const [token, setToken] = useState<string>(savedToken);
    localStorage.setItem("token", token) //will always equal state variable.

    //Function for changing (add/remove value) the token state. Will be stored in Localstorage. (Value removed on logout)
    const changeToken = (token: string) => {
        setToken(token);
    };
    //username from LocalStorage
    const savedUsername: string = localStorage.getItem("username") ?? ""
    //state for username
    const [username, setUsername] = useState<string>(savedUsername);
    localStorage.setItem("username", username) //will always equal state variable.

    ///Function for changing (adding) the current username. Will be stored in Localstorage. (Value remains on logout)
    const currentUsername = (newUsername: string) => {
        setUsername(newUsername)
    }

    //All Context Values
    const authContextValues: AuthContextType = useMemo(
        () => ({
            setToken: changeToken, //call to set the token
            token: token,
            setUsername: currentUsername,  //call to set the username
            username: username
        }),
        [username, token]
    );





    return (
        <AuthContext.Provider value={authContextValues}>
            {children}
        </AuthContext.Provider>
    );
}