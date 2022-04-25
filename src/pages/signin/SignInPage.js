import React, {useContext, useState} from 'react';
import  './SignIn.css';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

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
            <h3 className="page-header-title">Login Pagina</h3>
            <nav className="navbar">

            </nav>
            <div>
                <form
                    onSubmit={handleSubmit}
                >
                    <p className="form-header">Login</p>
                    <label
                        htmlFor="username">
                        <input
                            type="text"
                            id="username"
                            placeholder="username"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                        />
                    </label>
                    <label htmlFor="password">
                        <input
                            type="password"
                            id="signin-password"
                            placeholder="password"
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