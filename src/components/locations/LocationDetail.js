import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import './location.css'
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
    const { locations, deleteLocation } = useContext(LocationContext)
    const [ location, setLocation ] = useState({ employees: [], animals: [] })

    const { locationId } = useParams();
    const  history  = useHistory()
    // const handleDeleteLocation = () => {
    //     deleteLocation(location.id)
    //     .then(() => {
    //         history.push("/locations")
    //     })
    // }
    
    useEffect(() => {
        const thisLocation = locations.find(l => l.id === parseInt(locationId)) || { employees: [], animals: [] }
        setLocation(thisLocation)
    }, [locationId])

    return (
        <section className="location">
        <h3 className="location__name">{ location.name }</h3>
        <div className="location__animals">Animals: { location.animals.map(animal => animal.name).join(",") }</div>
        <div className="location__employees">Employees: { location.employees.map(employee => employee.name).join(", ") } </div>
        {/* <button onClick ={handleDeleteLocation}>Delete</button> */}
        <button onClick={() => {
            history.push(`/locations/edit/${location.id}`)
        }}>Edit</button>
    </section>
    )
}