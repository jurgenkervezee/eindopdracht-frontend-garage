import './Home.css';
import React from 'react';
import {Link} from 'react-router-dom';
import logo from "../../assets/Mechanic.png";
import PageHeader from "../../components/pageheader/PageHeader";


function HomePage() {

    return (
        <>
            <div className="inner-container">

                <h3 className="page-header-title">Home Pagina</h3>
                <nav className="navbar">
                </nav>
                <PageHeader
                    logo={logo}
                    logoName="homepageLogo"
                />

                <p>Algemene informatie over de garage en een link om naar de inlog pagina te gaan.</p>
                <p>Je kunt deze <Link to="/signin">link</Link> gebruiken om in te loggen</p>
            </div>
        </>
    );
}

export default HomePage;