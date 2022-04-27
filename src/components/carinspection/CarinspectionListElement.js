import React from "react";
import FormatDate from "../../helper/FormatDate";
import { Link }  from "react-router-dom/";

function CarinspectionListElement({data}){

    return (

        <tr>
            <td>{data.client.firstName} {data.client.lastName}</td>
            <td>{FormatDate(data.date)}</td>
            <td>{data.status.name}</td>
            <td className="inspect-link"><Link  to={`mechanic/${data.id}`}>inspect</Link></td>
        </tr>
    );
}

export default CarinspectionListElement;