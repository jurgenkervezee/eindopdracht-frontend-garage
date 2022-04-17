import React, {useEffect, useState} from "react";
import {createContext} from 'react';
import axios from "axios";

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });


function signIn(jwt, role){
    localStorage.setItem("token", jwt);
    localStorage.setItem("role", role);
}




    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: signIn,
        // logout: signOut,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
            {/*{isAuth.status === 'done' ? children : <p>Loading...</p> }*/}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;