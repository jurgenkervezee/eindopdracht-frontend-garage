import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import DisplayClientCarinspection from "../../components/carinspection/DisplayClientCarinspection";

function MechanicPageCarinspection() {

    const {carinspectionId} = useParams();
    const [carinspection, setCarinspection] = useState(null);

    // const [repairActivityList, setRepairActivityList] = useState(null);
    const [carpartList, setCarpartList] = useState(null);
    const [repairPrice, setRepairPrice] = useState(null);

    // useEffect()

    useEffect(() => {
        const token = localStorage.getItem('token');

        async function getInspectionAppointment() {
            try {
                const result = await axios.get(`http://localhost:8080/api/inspections/appointmentid/${carinspectionId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(result);
                setCarinspection(result.data);

            } catch (e) {
                console.error(e);
            }
        }

        async function getCarParts() {
            try {
                const result = await axios.get('http://localhost:8080/api/inspections/carparts/list', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                //change list to include an extra field for capartsUsed
                const newList = result.data.map((carpart) => {
                    const temp = {
                        id: carpart.id,
                        description: carpart.description,
                        price: carpart.price,
                        amount: 0,
                    };
                    return temp;
                });
                setCarpartList(newList);

            } catch (e) {
                console.error(e);
            }
        }

        getInspectionAppointment();
        getCarParts();

    }, [carinspectionId]);

    async function handleGetPrice() {
        const token = localStorage.getItem('token');
        try {
            const result = await axios.get(`http://localhost:8080/api/inspections/repairprice/${carinspectionId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setRepairPrice(result.data);
            console.log(result.data);

        } catch (e) {
            console.error(e);
        }
    }

    function handleAddClick(index) {
        let newArray = [...carpartList];
        newArray[index].amount = carpartList[index].amount + 1;
        setCarpartList(newArray);
    }

    function handleSubClick(index) {
        let newArray = [...carpartList];

        newArray[index].amount = carpartList[index].amount - 1;
        setCarpartList(newArray);
    }

    async function handleAddCarpart(carpartId, amount, description) {
        const token = localStorage.getItem('token');
        try {
            const result = await axios.post(`http://localhost:8080/api/inspections/carinspectionid/${carinspectionId}/carpart/${carpartId}/amount/${amount}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

            if (result.status === 204) {
                alert(`Het onderde(e)l(en) ${amount} ${description} is/zijn opgeslagen in de database`);
            }
            console.log(result);

        } catch (e) {
            if (e.response.status === 409) {
                alert(`De status van de carinspectie is niet correct voor deze handeling.`);
            }
            console.error(e);
        }
    }

    return (
        <>
            {carinspection &&
                <>
                    <div className="inner-container">
                        <h3 className="page-header-title">Keuringsdetails</h3>
                        <nav className="navbar">
                            <div>
                                <DisplayClientCarinspection
                                    client={carinspection.client}
                                    status={carinspection.status}
                                />
                            </div>
                        </nav>
                        <table className="carpart-table">
                            <thead>
                            <tr>
                                <th>Auto Onderdeel</th>
                                <th>Prijs</th>
                                <th>Voegtoe</th>
                                <th>Aantal</th>
                                <th>Bevestig</th>
                            </tr>
                            </thead>
                            <tbody>
                            {carpartList.map((carpart, index) => {
                                return (
                                    <>
                                        <tr key={`${carpart.description} - ${index}`}>
                                            <td>{carpart.description}</td>
                                            <td>{carpart.price}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    disabled={carpartList[index].amount === 0}
                                                    onClick={() => {
                                                        handleSubClick(index);
                                                    }}
                                                >-
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        handleAddClick(index);
                                                    }}
                                                >+
                                                </button>
                                            </td>
                                            <td>{carpart.amount}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        handleAddCarpart(carpart.id, carpart.amount, carpart.description);
                                                    }}
                                                >bevestig
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                            </tbody>
                        </table>
                        <div>
                            <button
                                className="inspection-button"
                                onClick={handleGetPrice}
                            >
                                Inspectie Gereed en toon prijs
                            </button>
                            <div className="tooltip">ℹ️
                                <div className="tooltiptext">️Status Open is voor keuring
                                    , status Inspected is na Keuring. Na de keuring kan er ook geen prijs meer worden
                                    getoond
                                </div>
                            </div>
                        </div>

                        {repairPrice &&
                            <>
                                <h3>Totaal Prijs: € {repairPrice} </h3>
                                <div>
                                    <button
                                        type="button"
                                    >Repareer
                                    </button>
                                    <button
                                        type="button"
                                    >Repareer Niet
                                    </button>
                                </div>

                            </>

                        }

                    </div>
                </>
            }
        </>

    );
}

export default MechanicPageCarinspection;