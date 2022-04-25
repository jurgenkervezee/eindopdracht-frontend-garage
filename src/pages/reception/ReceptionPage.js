import './Reception.css';
import React, {useState} from 'react';
import axios from "axios";
import {useForm } from 'react-hook-form';
import DisplayClientTable from "../../components/reception/DisplayClientTable";


function ReceptionPage() {

    //tabs
    const [activeTab, setActiveTab] = useState('tab-1');
    //state for searchClient
    const [clientSearchName, setClientSearchName] = useState('');
    const [client, setClient] = useState(null);
    //state for newClient
    const { handleSubmit, formState: { errors }, register } = useForm();

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
            if(result.status === 200 && result.data=== ""){
                console.log("Niets gevonden")
            }
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
        alert(`De gebruiker is succesvol opgeslagen onder id: ${result.data}`)
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
                            {client ?
                                <>
                                    <DisplayClientTable client={client}/>
                                </>
                                :
                                <p>Geen resultaten</p>
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
                                    {errors.firstName && <p className="validation-alert">{errors.firstName.message}</p>}
                                    <input
                                        type="text"
                                        id="newClientFirstName"
                                        placeholder="voornaam"
                                        {...register("firstName", {required: "Het veld voornaam mag niet leeg zijn"})}
                                    />
                                    {errors.lastName && <p className="validation-alert">{errors.lastName.message}</p>}
                                    <input
                                        type="text"
                                        id="newClientLastName"
                                        placeholder="achternaam"
                                        {...register("lastName", {required: "Het veld achternaam mag niet leeg zijn"})}
                                    />
                                    {errors.streetName && <p className="validation-alert">{errors.streetName.message}</p>}
                                    <input
                                        type="text"
                                        id="newClientStreetName"
                                        placeholder="straat naam"
                                        {...register("streetName", {required: "Het veld straatnaam mag niet leeg zijn"})}
                                    />
                                    {errors.houseNumber && <p className="validation-alert">{errors.houseNumber.message}</p>}
                                    <input
                                        type="number"
                                        id="newClientHouseNumber"
                                        placeholder="huisnummer"
                                        {...register("houseNumber", {required: "Het veld huisnummer mag niet leeg zijn"})}
                                    />
                                    <input
                                        type="text"
                                        id="newClientHouseNumberAddition"
                                        placeholder="huisnummer toevoeging"
                                        {...register("houseNumberAddition")}
                                    />
                                    {errors.postalCode && <p className="validation-alert">{errors.postalCode.message}</p>}
                                    <input
                                        type="text"
                                        id="newClientPostalCode"
                                        placeholder="postcode"
                                        {...register("postalCode", {required: "Het veld postcode mag niet leeg zijn"})}
                                    />
                                    {errors.homeTown && <p className="validation-alert">{errors.homeTown.message}</p>}
                                    <input
                                        type="text"
                                        id="newClientHomeTown"
                                        placeholder="woonplaats"
                                        {...register("homeTown", {required: "Het veld woonplaats mag niet leeg zijn"})}
                                    />
                                    {errors.phoneNumber && <p className="validation-alert">{errors.phoneNumber.message}</p>}
                                    <input
                                        type="tel"
                                        id="newClientPhoneNumber"
                                        placeholder="telefoonummer"
                                        {...register("telephoneNumber", {required: "Het veld telefoonnummer mag niet leeg zijn"})}
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