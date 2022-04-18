import logo from "../assets/Mechanic.png";
import React from "react";


function PageHeader({title,logo,logoName }){
    return(
      <div className="titel-container">

          <img
              src={logo}
              alt={logoName}
              className="logo"
          />
          <h2>{title}</h2>
      </div>

    );
}

export default PageHeader;