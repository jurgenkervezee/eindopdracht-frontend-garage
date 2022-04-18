import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Mechanic.png";

function HomePage() {

    return (
        <>
            <h3>Home Pagina</h3>
            <div>
                <img
                    src={logo}
                    alt="logo"
                    className="logo"
                />
            </div>
            <p>Algemene informatie over de garage en een link om naar de inlog pagina te gaan.</p>
            <p>Je kunt deze <Link to="/signin">link</Link> gebruiken om in te loggen</p>
        </>
    );
}

export default HomePage;