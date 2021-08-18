import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider" 
import "./location.css"
import { useHistory, Link } from 'react-router-dom'
export const LocationList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("LocationList: useEffect - getLocations")
    getLocations()
  }, [])

  const history = useHistory()
  
  return (
    <>
      <h2>Locations</h2>
      <button onClick={
        () => history.push("/locations/create")
      }>
        Add Location
      </button>
    <section className="locations">
      {
        locations.map(location => {
          return (
            <div key={location.id} className="location">
              <Link to={`locations/detail/${location.id}`}>
               <h2>{location.name}</h2>
                
               <div>Animals: {location.animals.length}</div> 
               <div>Employees: {location.employees.length}</div>
              </Link>
            </div>
          )
        })
      }
    </section>
    </>
  )
}