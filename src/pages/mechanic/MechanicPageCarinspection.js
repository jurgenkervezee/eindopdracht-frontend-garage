import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import DisplayClientTable from "../../components/reception/DisplayClientTable";


function MechanicPageCarinspection() {

    const {carinspectionId} = useParams();
    const [carinspection, setCarinspection] = useState(null);


    useEffect(() => {

        async function getInspectionAppointment() {
            const token = localStorage.getItem('token');
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

        getInspectionAppointment();

    }, [carinspectionId]);

    return (
        <>
            {carinspection &&
                <>
                    <h3>Keuringsdetails</h3>
                    <div>
                        <DisplayClientTable client={carinspection.client}/>
                        <p>Status: {carinspection.status.name}</p>
                    </div>
                </>
            }
        </>

    );
}

export default MechanicPageCarinspection;