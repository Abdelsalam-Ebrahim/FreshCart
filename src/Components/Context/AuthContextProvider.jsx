import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function AuthContextProvider ( { children } ) {

    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect( () => {
        let tkn = localStorage.getItem("token");

        if(tkn !== null ) {
            setToken(tkn);
        }
    }, [] );

    useEffect( () => {
        if(token != null) {
            setUserData(jwtDecode(token));
        }
    }, [token] );

    return <AuthContext.Provider value={ { token, setToken, userData } }>
    
        { children }

    </AuthContext.Provider>
}
