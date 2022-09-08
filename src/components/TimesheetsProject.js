import React from "react";
import { useParams } from "react-router-dom";
import { useSearchTimesheetsProjectQuery } from "../api/youtrack.api";



export function TimesheetsProject(){
    const id = useParams()
    const {isLoading, isError, data} = useSearchTimesheetsProjectQuery(id.id)
    console.log(data)
    return(
        <div>787878</div>
    )
}