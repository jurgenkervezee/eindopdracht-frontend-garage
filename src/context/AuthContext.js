import React, {useEffect, useState} from "react";
import {createContext} from 'react';
import {useHistory} from "react-router-dom";

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {
    const history = useHistory();

    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem("token")
        const role =  localStorage.getItem("role")
        if(!token){
            history.push('/signin')
            setIsAuth({
                ...isAuth,
                status: "done",
                }
            )
            }
            else {
                setIsAuth({
                    isAuth: true,
                    user: {
                        role: role
                    },
                    status: "done",
                })
            }
    }, [])

    
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
        },
        isAuth: true,
        status: 'done'
    });
}

function signOut(){
        localStorage.clear();
        setIsAuth({
            user: null,
            isAuth: false,
            status: 'done',
        })
}

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        setIsAuth,
        login: signIn,
        logout: signOut,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;