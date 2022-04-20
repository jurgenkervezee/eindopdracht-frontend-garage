import './Reception.css';
import React, {useState} from 'react';
import axios from "axios";
import Tabs from "../components/tabs/Tabs";

function ReceptionPage() {

    const [navSearchClient, setNavSearchClient] = useState(true);
    const [navNewClient, setNavNewClient] = useState(false);
    const [navAppointment, setNavAppointment] = useState(false);

    const [clientSearchName, setClientSearchName] = useState('');
    const [client, setClient] = useState(null);


    function handleMenuVisibility(menuItem) {

        switch (menuItem) {
            case "Zoek Client":
                setNavSearchClient(true);
                setNavNewClient(false);
                setNavAppointment(false);
                break;
            case "Nieuwe Client":
                setNavSearchClient(false);
                setNavNewClient(true);
                setNavAppointment(false);
                setClient(null);
                break;
            case "Maak Afspraak":
                setNavSearchClient(false);
                setNavNewClient(false);
                setNavAppointment(true);
                setClient(null);
                break;
            default:
                setNavSearchClient(true);
                setNavNewClient(false);
                setNavAppointment(false);
                break;
        }
    }

    async function handleClientSearch(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const result = await axios.get(`http://localhost:8080/api/clients/lastname/${clientSearchName}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(result);
            setClient(result.data);

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="inner-container">
                <h3>Receptie Pagina</h3>
                <nav className="navbar">
                    <ul>
                        <button
                            type="button"
                            onClick={() => handleMenuVisibility("Zoek Client")}
                        >
                            Zoek Client
                        </button>
                        <button
                            type="button"
                            onClick={() => handleMenuVisibility("Nieuwe Client")}
                        >
                            Nieuwe Client
                        </button>
                        <button
                            type="button"
                            onClick={() => handleMenuVisibility("Maak Afspraak")}
                        >Maken Afspraak
                        </button>
                    </ul>
                </nav>
                {/*Form element to search for clients*/}
                {navSearchClient ?
                    <form
                        onSubmit={handleClientSearch}
                    >
                        <label
                            htmlFor="client">
                            Zoek client
                            <input
                                type="text"
                                id="client"
                                onChange={(e) => setClientSearchName(e.target.value)}
                                value={clientSearchName}
                            />
                        </label>
                        <button
                            type="submit"
                        >Zoek
                        </button>
                    </form>
                    : <p>Loading</p>
                }

                {client ?
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
                    : <p>Nog geen klant gegevens gevonden</p>
                }

            </div>
        </>
    );
}

export default ReceptionPage;