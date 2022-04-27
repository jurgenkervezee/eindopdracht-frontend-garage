function FormatDate(dbaseDate){
    const date = new Date(dbaseDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return(day + '-' + month + '-' + year);
}
export default FormatDate;