import logo from "../assets/Mechanic.png";
import React from "react";
import "./pageheader.css";


function PageHeader({logo,logoName }){
    return(
      <div className="title-container">

          <img
              src={logo}
              alt={logoName}
              className="logo"
          />
      </div>

    );
}

export default PageHeader;