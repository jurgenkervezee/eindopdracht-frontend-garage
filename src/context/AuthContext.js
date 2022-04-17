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


    
function signIn(result){
    localStorage.setItem("token", result.accessToken);
    localStorage.setItem("role", result.roles[0]);

    setIsAuth({
        ...isAuth,
        user: {
            id: result.id,
            role: result.roles[0],
            username: result.username,
            email: result.email,
        }
    });
}




    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        setIsAuth,
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