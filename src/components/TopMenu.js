import './TopMenu.css';
import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


function TopMenu() {

    const history = useHistory();
    const {isAuth, logout} = useContext(AuthContext);

    return (
        <>
            <nav className="nav-container">

                    <h4>GarageBedrijf Frontend</h4>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/reception">Reception</Link>
                        </li>
                        <li>
                            <Link to="/mechanic">Monteur</Link>
                        </li>
                        <li>
                            <Link to="/cashier">Betalen</Link>
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