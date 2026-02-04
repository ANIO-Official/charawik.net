import React, { useContext } from 'react';
import type { AuthContextType } from '../../types';

//Create the context, export for access in other modules
//undefined = not wrapping component that needs it
export const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

//Create a Toggle function as a custom Hook
//Consumes the context and throws error when not setup properly
export const useAuthContext = () => {
    const authContext = useContext(AuthContext)
    
    if(!authContext){
        throw new Error(
            'Missing ThemeContent.Provider Wrapper.'
        )
    }
    return {
        setToken: authContext.setToken, //setdefaults
        token: authContext.token, //setdefaults
        setUsername: authContext.setUsername,
        username: authContext.username
    }
}