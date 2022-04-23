import './Reception.css';
import React, {useState} from 'react';
import axios from "axios";
import {useForm} from 'react-hook-form';


function ReceptionPage() {

    //tabs
    const [activeTab, setActiveTab] = useState('tab-1');
    //state for searchClient
    const [clientSearchName, setClientSearchName] = useState('');
    const [client, setClient] = useState(null);
    //state for newClient
    const {register, handleSubmit} = useForm();


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

    async function handleNewClient(data) {
        const token = localStorage.getItem('token');
        console.log(data);

        try {
        const result = await axios.post("http://localhost:8080/api/clients/", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            console.log(result);
        alert(`De gebruiker is opgeslagen onder id: ${result.data}`)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="inner-container">
                <h3>Receptie Pagina</h3>
                <nav className="navbar">

                    <button onClick={() => setActiveTab('tab-1')}>ZOEK</button>
                    <button onClick={() => setActiveTab('tab-2')}>NIEUW</button>
                </nav>

                {activeTab === 'tab-1' &&
                    // Tab search client />
                    <>
                        <form
                            onSubmit={handleClientSearch}
                        >
                            <fieldset>
                                <legend>Zoek Client</legend>
                                <label
                                    htmlFor="client">
                                    <input
                                        type="text"
                                        placeholder="achternaam"
                                        id="client"
                                        onChange={(e) => setClientSearchName(e.target.value)}
                                        value={clientSearchName}
                                    />
                                </label>
                                <button
                                    type="submit"
                                >Zoek
                                </button>
                            </fieldset>
                        </form>
                        <div>
                            {/*{Object.keys(client).length > 0 ?*/}
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
                                :
                                <p>
                                    niks
                                </p>
                            }
                        </div>
                    </>
                }


                {activeTab === 'tab-2' &&
                    // <Tab Two new client/>
                    <>
                        <form
                            onSubmit={handleSubmit(handleNewClient)}
                        >
                            <fieldset>
                                <legend>Nieuwe Client</legend>
                                <label
                                    htmlFor="clientnew">
                                    <input
                                        type="text"
                                        id="newClientFirstName"
                                        placeholder="voornaam"
                                        {...register("firstName")}
                                    />
                                    <input
                                        type="text"
                                        id="newClientLastName"
                                        placeholder="achternaam"
                                        {...register("lastName")}
                                    />
                                    <input
                                        type="text"
                                        id="newClientStreetName"
                                        placeholder="straat naam"
                                        {...register("streetName")}
                                    />
                                    <input
                                        type="number"
                                        id="newClientHouseNumber"
                                        placeholder="huisnummer"
                                        {...register("houseNumber")}
                                    />
                                    <input
                                        type="text"
                                        id="newClientHouseNumberAddition"
                                        placeholder="huisnummer toevoeging"
                                        {...register("houseNumberAddition")}
                                    />
                                    <input
                                        type="text"
                                        id="newClientPostalCode"
                                        placeholder="postcode"
                                        {...register("postalCode")}
                                    />
                                    <input
                                        type="text"
                                        id="newClientHomeTown"
                                        placeholder="woonplaats"
                                        {...register("homeTown")}
                                    />
                                    <input
                                        type="tel"
                                        id="newClientPhoneNumber"
                                        placeholder="telefoonummer"
                                        {...register("phoneNumber")}
                                    />
                                </label>
                                <button
                                    type="submit"
                                >bevestig
                                </button>
                            </fieldset>
                        </form>
                    </>
                }
            </div>
        </>
    );
}

export default ReceptionPage;