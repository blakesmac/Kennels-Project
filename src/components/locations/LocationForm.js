import React, { useContext, useEffect, useState} from "react"
import { LocationContext } from "../locations/LocationProvider"
import "./location.css"
import { useHistory, useParams } from 'react-router-dom';

export const LocationForm = () => {
    const { addLocation, getLocationById, updateLocation } = useContext(LocationContext)
    // const { locations, getLocations } = useContext(LocationContext)
    // check this for setEmployee if breaks
    const [location, setLocation] = useState({
        name: "",
        address: "",
    });
    const [isLoading, setIsLoading] = useState(true)
    const {locationId} = useParams();
    const history = useHistory();

    // useEffect(() => {
    //     getLocations()
    // },[])
    
    const handleControlledInputChange = (event) => {
        const newLocation = {...location}
        newLocation[event.target.id] = event.target.value
        setLocation(newLocation)
    }

    const handleClickSaveLocation = (event) => {
        // event.preventDefault()
        const address = location.address

        if (address === "") {
            window.alert("Please select an address for your new location.")
        } else {
            setIsLoading(true);
            if (locationId){
                updateLocation({
                    id: location.id,
                    name:  location.name,
                    address: location.address

                })
                .then (() => history.push(`/locations/detail/${location.id}`))
            }else {
                addLocation({
                    name: location.name,
                    address: location.address
                })
                .then(() => history.push("/locations"))
            }
        }
    }
    useEffect(() => {
        if (locationId){
            getLocationById(locationId)
            .then(location => {
                setLocation(location)
                setIsLoading(false)
            })

        }else {
            setIsLoading(false)
        }
    }, [])


    return (
        <form className="locationForm">
            <h2 className="locationForm__title">New Location</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Location Name:</label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Location Name" value={location.name} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlfor="location">Assign address to Location:</label>
                    <input type="text" id="location" required autoFocus className="form-control" placeholder="Location Address" value={location.address} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleClickSaveLocation()
        }}>
      {locationId ? <>Save Location</> : <>Add Location</>}</button>
        </form>
    )
}