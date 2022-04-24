import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import DisplayClientTable from "../../components/reception/DisplayClientTable";
import DisplayClientCarinspection from "../../components/carinspection/DisplayClientCarinspection";


function MechanicPageCarinspection() {

    const {carinspectionId} = useParams();
    const [carinspection, setCarinspection] = useState(null);


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
                const carParts = await axios.get('http://localhost:8080/api/inspections/carparts/list', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(carParts);
            } catch (e) {
                console.error(e);
            }
        }
        async function getRepairActivity() {
            try {
                const repairActivity = await axios.get('http://localhost:8080/api/inspections/repairactivity/list', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(repairActivity);
            } catch (e) {
                console.error(e);
            }
        }


        getInspectionAppointment();
        getCarParts();
        getRepairActivity();


    }, [carinspectionId]);

    return (
        <>
            {carinspection &&
                <>
                    <h3>Keuringsdetails</h3>
                    <div>
                        <DisplayClientCarinspection
                            client={carinspection.client}
                            status={carinspection.status}
                        />
                    </div>
                </>
            }
        </>

    );
}

export default MechanicPageCarinspection;