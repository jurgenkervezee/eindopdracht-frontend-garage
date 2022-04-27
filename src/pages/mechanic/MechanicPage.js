import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./mechanic.css";
import CarinspectionListElement from "../../components/carinspection/CarinspectionListElement";

function MechanicPage() {
    const [carinspectionlist, setCarinspectionList] = useState({});


    useEffect(() => {
        async function handleCarinspectionList() {
            const token = localStorage.getItem('token');

            try {
                const result = await axios.get("http://localhost:8080/api/inspections/list", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                const filteredList = result.data.filter((carinspection) => {
                    return carinspection.status.name === 'OPEN';
                });
                console.log(filteredList);

                setCarinspectionList(filteredList);

            } catch (e) {
                console.error(e);
            }
        }

        handleCarinspectionList();
    }, []);


    return (
        <>
            <div className="inner-container">
                <h3 className="page-header-title">Werkplaats Pagina</h3>
                <nav className="navbar">

                </nav>


                {carinspectionlist.length > 0 &&
                    <>
                        <h3>KeuringsLijst</h3>
                        <table className="inspection-table">
                            <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Datum</th>
                                <th>Status</th>
                                <th>Keur</th>
                            </tr>
                            </thead>
                            <tbody>
                            {carinspectionlist.map((inspection) => {
                                return (
                                    <>
                                        <CarinspectionListElement
                                            key={`${inspection.id} + ${inspection.client.telephoneNumber}`}
                                            data={inspection}
                                        />
                                    </>
                                );
                            })}
                            </tbody>
                        </table>
                    </>
                }
            </div>
        </>
    );
}

export default MechanicPage;