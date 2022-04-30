import './Reception.css';
import React, {useState} from 'react';
import axios from "axios";
import {useForm} from 'react-hook-form';
import DisplayClientTable from "../../components/reception/DisplayClientTable";
import FormatDate from "../../helper/FormatDate";

function ReceptionPage() {

    //tabs
    const [activeTab, setActiveTab] = useState('tab-1');
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);
    //state for searchClient
    const [clientSearchName, setClientSearchName] = useState('');
    const [client, setClient] = useState(null);
    //state for newClient
    const {handleSubmit, formState: {errors}, register} = useForm();

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
            setSearchResultsVisible(true);
            if (result.status === 200 && result.data === "") {
                console.log("Niets gevonden");
            }
            console.log(result);
            setClient(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function handleNewClient(data) {
        const token = localStorage.getItem('token');

        try {
            const result = await axios.post("http://localhost:8080/api/clients/", data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log(result);
            alert(`De gebruiker is succesvol opgeslagen onder id: ${result.data}`);
        } catch (e) {
            console.error(e);
        }
    }

    async function handleAppointment(data) {
        const token = localStorage.getItem('token');
        console.log(data);
        try {

            const temp = (FormatDate(data.date));
            const formatedDate = {
                ...data,
                date: {temp},
            };
            const result = await axios.post(`http://localhost:8080/api/clients/appointment/${client.id}`,
                {formatedDate},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
            alert(`De afspraak is opgeslagen onder id: ${result}`);
        } catch (e) {
            if (e.response.status === 409) {
                alert(`Er mag geen dubbele afspraak gemaakt worden`);
            }
        }
    }

    return (
        <>
            <div className="inner-container">
                <h3 className="page-header-title">Receptie Pagina</h3>
                <nav className="navbar">

                    <button className="reception-tabs" onClick={() => setActiveTab('tab-1')}>Zoek</button>
                    <button className="reception-tabs" onClick={() => setActiveTab('tab-2')}>Nieuw</button>
                </nav>

                {activeTab === 'tab-1' &&
                    // Tab search client />
                    <>
                        <form
                            onSubmit={handleClientSearch}
                        >
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
                        </form>
                        <div>
                            {(client && searchResultsVisible) &&
                                <>
                                    <DisplayClientTable client={client}/>
                                    <form
                                        onSubmit={handleSubmit(handleAppointment)}>
                                        <legend>Maak Afspraak</legend>
                                        <label htmlFor="maakAppointment">
                                            {errors.date && <p className="validation-alert">{errors.date.message}</p>}
                                            <input
                                                type="date"
                                                id="date"
                                                placeholder="voornaam"
                                                {...register("date", {required: "Het datum veld mag niet leeg zijn"})}
                                            />
                                            <button
                                                type="submit"
                                            >Bevestig
                                            </button>
                                        </label>
                                    </form>
                                </>
                            }
                            {((!client || client.data === "" ) && searchResultsVisible) &&
                                <>
                                    <p className="no-search-results">Geen resultaten gevonden</p>
                                </>
                            }
                        </div>
                    </>
                }
                {activeTab === 'tab-2' &&
                    // <Tab new client/>
                    <>
                        <form
                            onSubmit={handleSubmit(handleNewClient)}
                        >
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
                                {errors.streetName &&
                                    <p className="validation-alert">{errors.streetName.message}</p>}
                                <input
                                    type="text"
                                    id="newClientStreetName"
                                    placeholder="straat naam"
                                    {...register("streetName", {required: "Het veld straatnaam mag niet leeg zijn"})}
                                />
                                {errors.houseNumber &&
                                    <p className="validation-alert">{errors.houseNumber.message}</p>}
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
                                {errors.postalCode &&
                                    <p className="validation-alert">{errors.postalCode.message}</p>}
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
                                {errors.phoneNumber &&
                                    <p className="validation-alert">{errors.phoneNumber.message}</p>}
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
                        </form>
                    </>
                }
            </div>
        </>
    );
}

export default ReceptionPage;