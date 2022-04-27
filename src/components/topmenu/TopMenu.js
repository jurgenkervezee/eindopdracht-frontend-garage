import './TopMenu.css';
import React, {useContext} from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';


function TopMenu() {

    const history = useHistory();
    const {isAuth, logout} = useContext(AuthContext);

    return (
        <>
            <nav className="nav-container">

                    <h4>GarageBedrijf Frontend</h4>
                    <ul>
                        <li>
                            <NavLink to="/" exact activeClassName="active-link" className="header-menu">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/reception" exact activeClassName="active-link" className="header-menu">Reception</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/mechanic"
                                exact
                                activeClassName="active-link"
                                className="header-menu"
                            >Monteur</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/cashier"
                                exact
                                activeClassName="active-link"
                                className="header-menu">Betalen</NavLink>
                        </li>
                    </ul>
                    <div>
                        {!isAuth ?
                            <>
                                <button
                                    type="button"
                                    onClick={() => history.push('/signin')}
                                >
                                    Login
                                </button>
                            </>
                            :
                            <>
                                <button
                                    type="button"
                                    onClick={logout}
                                >
                                    Log Out
                                </button>
                            </>
                        }
                    </div>
            </nav>
        </>
    );
}

export default TopMenu;