import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { AnimalContext } from "./AnimalProvider"
import { AnimalDetail } from "./AnimalDetail"
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals, searchTerms } = useContext(AnimalContext)

  const [ filteredAnimals, setFiltered] = useState([])
  const history = useHistory()
  //useEffect - reach out to the world for something
  useEffect(() => {
    getAnimals()
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      setFiltered(animals)
    }
  }, [searchTerms, animals])
  

  return (
  <>
    <h2>Animals</h2>
    <button onClick={
      () => history.push("/animals/create")}>

      Make Reservation
    </button>
    <div className="animals">
      {
        filteredAnimals.map(animal => {
          return <AnimalDetail key={animal.id} animal={animal} />
        })
      }
    </div>
  </>
  )
}
