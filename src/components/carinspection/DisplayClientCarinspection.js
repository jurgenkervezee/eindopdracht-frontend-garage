import React from "react";
import "./Displayclient.css"
function DisplayClientCarinspection({client, status}) {

    return (
        <>
            <div className="carinspection-client-info">
                <ul>
                    <li>Naam: {client.firstName} {client.lastName}</li>
                    <li>Telefoonnummer: {client.telephoneNumber}</li>
                    <li>Status: {status.name}</li>
                </ul>
            </div>
        </>
    );
}

export default DisplayClientCarinspection;