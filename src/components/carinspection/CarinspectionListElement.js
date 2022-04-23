import React from "react";
import FormatDate from "../../helper/FormatDate";
import { Link }  from "react-router-dom/";

function CarinspectionListElement({data}){

    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.client.firstName} {data.client.lastName}</td>
            <td>{FormatDate(data.date)}</td>
            <td><Link to={`mechanic/${data.id}`}>inspect</Link></td>
        </tr>
    );
}

export default CarinspectionListElement;