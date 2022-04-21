import React, {useContext, useState} from 'react';
import  './SignIn.css';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function SignInPage() {

    const history = useHistory();
    const { login } = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const result = await axios.post('http://localhost:8080/api/auth/signin', {

                username: userName,
                password: password,

            });
            login(result.data);
            const role = result.data.roles[0];

        if(role === "ROLE_RECEPTION"){
        history.push('/reception')
        } else if(role === "ROLE_MECHANIC"){
            history.push('/mechanic')
        } else if(role === "ROLE_CASHIER"){
            history.push('/cashier')
        }

        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
            <h3>Login Pagina</h3>
            <div>
                <form
                    onSubmit={handleSubmit}
                >
                    <label
                        htmlFor="username">
                        Username
                        <input
                            type="text"
                            id="username"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                        />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input
                            type="password"
                            id="signin-password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </label>
                    <button
                        type="submit"
                    >Inloggen
                    </button>
                </form>
            </div>
        </>
    );
}

export default SignInPage;