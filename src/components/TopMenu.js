import './TopMenu.css';
import React from 'react';
import { Link } from 'react-router-dom';

function TopMenu() {
  return (
    <nav>
      <div className="nav-container">
        <h4>GarageBedrijf frontend</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Inloggen</Link>
          </li>
          <li>
            <Link to="/reception">reception</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default TopMenu;