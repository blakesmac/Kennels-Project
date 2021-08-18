import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import "./Animal.css"
import { useHistory, useParams } from 'react-router-dom';

export const AnimalForm = () => {
  const { addAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
  const { locations, getLocations } = useContext(LocationContext)
  const { customers, getCustomers } = useContext(CustomerContext)

  //for editing, hold on to the state of the animal here
  const [animal, setAnimal] = useState({
    name: "",
    breed: "",
    locationId: 0,
    customerId: 0,
  });
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);
  const {animalId} = useParams();
        const history = useHistory();

  
  /*
  Reach out to the world and get customers state
  and locations state on initialization.
  */
  // useEffect(() => {
  //   getCustomers().then(getLocations)
  // }, [])
  // setting transient state below
  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newAnimal = { ...animal }
    /* Animal is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newAnimal[event.target.id] = event.target.value
    // update state
    setAnimal(newAnimal)
  }
  const handleSaveAnimal = () => {
    if (parseInt(animal.locationId) === 0) {
        window.alert("Please select a location")
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (animalId){
        //PUT - update
        updateAnimal({
            id: animal.id,
            name: animal.name,
            breed: animal.breed,
            locationId: parseInt(animal.locationId),
            customerId: parseInt(animal.customerId)
        })
        .then(() => history.push(`/animals/detail/${animal.id}`))
      }else {
        //POST - add
        addAnimal({
            name: animal.name,
            breed: animal.breed,
            locationId: parseInt(animal.locationId),
            customerId: parseInt(animal.customerId)
        })
        .then(() => history.push("/animals"))
      }
    }
  }

  // Get customers and locations. If animalId is in the URL, getAnimalById
  useEffect(() => {
    getCustomers().then(getLocations).then(() => {
      if (animalId){
        getAnimalById(animalId)
        .then(animal => {
            setAnimal(animal)
            setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  

  return (
    <form className="animalForm">
      <h2 className="animalForm__title">New Animal</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="animalName">Animal name: </label>
          <input type="text" id="name" name="name" required autoFocus className="form-control"
          placeholder="Animal name"
          onChange={handleControlledInputChange}
          defaultValue={animal.name}/>
        </div>
      </fieldset>
      <fieldset>
      <div className="form-group">
          <label htmlFor="name">Animal breed:</label>
          <input type="text" id="breed" required autoFocus className="form-control" placeholder="Animal breed" value={animal.breed} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select value={animal.locationId} name="locationId" id="locationId" className="form-control" onChange={handleControlledInputChange}>
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="customer">Customer: </label>
          <select value={animal.customerId} name="customerId" id="customerId" className="form-control" onChange={handleControlledInputChange}>
            <option value="0">Select a customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                  {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveAnimal()
        }}>
      {animalId ? <>Save Animal</> : <>Add Animal</>}</button>
    </form>
  )
}
