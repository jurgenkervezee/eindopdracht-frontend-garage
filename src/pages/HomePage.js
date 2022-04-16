import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {

    return (
        <>
            <p>HomePage</p>
            <p>Algemene informatie over de garage en een link om naar de inlog pagina te gaan.</p>
            <p>Je kunt deze <Link to="/signin">link</Link> gebruiken om in te loggen</p>
        </>
    );
}

export default HomePage;