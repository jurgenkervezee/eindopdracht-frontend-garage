import React, {useState} from 'react';
import axios from "axios";
import "./mechanic.css";
import CarinspectionListElement from "../../components/carinspection/CarinspectionListElement";

function MechanicPage() {
    const [carinspectionlist, setCarinspectionList] = useState({});

    async function handleCarinspectionList() {
        const token = localStorage.getItem('token');

        try {
            const result = await axios.get("http://localhost:8080/api/inspections/list", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(result);
            setCarinspectionList(result.data);
            console.log(carinspectionlist);

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <header className="inner-container">
                <h3>Werkplaats Pagina</h3>
                <nav className="navbar">
                    <button
                        type="button"
                        onClick={handleCarinspectionList}
                    >
                        Keuringen
                    </button>
                </nav>
            </header>

            <p>Maak een keuring en repareer de auto</p>

            {carinspectionlist.length > 0 &&
                <>
                    <table className="inspection-table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Naam</th>
                            <th>Datum</th>
                            <th>Keur</th>
                        </tr>
                        </thead>
                        <tbody>
                        {carinspectionlist.map((inspection) => {
                            return (
                                <>
                                    <CarinspectionListElement
                                        key={`${inspection.id}+${Math.random(5)}`}
                                        data={inspection}
                                    />

                                </>
                            );
                        })}
                        </tbody>
                    </table>
                </>

            }
        </>
    );
}

export default MechanicPage;