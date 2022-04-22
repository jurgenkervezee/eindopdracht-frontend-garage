import './Reception.css';
import React, {useState} from 'react';
import axios from "axios";


function ReceptionPage() {

    const [activeTab, setActiveTab] = useState('tab-1');
    const [clientSearchName, setClientSearchName] = useState('');
    const [client, setClient] = useState(null);


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

                    <button onClick={() => setActiveTab('tab-1')}>ZOEK</button>
                    <button onClick={() => setActiveTab('tab-2')}>NIEUW</button>
                </nav>

                {activeTab === 'tab-1' &&
                    // <TabComponentOne />
                    <>
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
                        <div>


                            {/*{Object.keys(client).length > 0 ?*/}

                            {/*    displayResult(client);*/}
                            {/*    :*/}
                            {/*    <p>*/}
                            {/*        dddd*/}
                            {/*    </p>*/}
                            {/*}*/}


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
                    // <TabComponentTwo/>
                    <>
                        <table className="client-table">
                            <tbody>
                            <tr>
                                <td>Naam:</td>
                                {/*<td>{client.firstName} {client.lastName}</td>*/}
                            </tr>
                            {/*<tr>*/}
                            {/*    <td>Adres:</td>*/}
                            {/*    <td>{client.address.streetName} {client.address.houseNumber}{client.address.houseNumberAddition}</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>Postcode Woonplaats:</td>*/}
                            {/*    <td>{client.address.postalCode} {client.address.homeTown}</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>Telefoonnummer:</td>*/}
                            {/*    <td>{client.telephoneNumber}</td>*/}
                            {/*</tr>*/}
                            </tbody>
                        </table>
                    </>
                }


            </div>
        </>
    );
}

export default ReceptionPage;