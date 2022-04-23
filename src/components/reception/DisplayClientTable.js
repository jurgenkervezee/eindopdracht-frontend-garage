import React from "react";

function DisplayClientTable({client}){

    return(
        <>
            <table className="client-table">
                <tbody>
                <tr>
                    <td>Naam:</td>
                    <td>{client.firstName} {client.lastName}</td>
                </tr>
                <tr>
                    <td>Adres:</td>
                    <td>{client.address.streetName} {client.address.houseNumber}{client.address.houseNumberAddition}</td>
                </tr>
                <tr>
                    <td>Postcode Woonplaats:</td>
                    <td>{client.address.postalCode} {client.address.homeTown}</td>
                </tr>
                <tr>
                    <td>Telefoonnummer:</td>
                    <td>{client.telephoneNumber}</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}
export default DisplayClientTable;