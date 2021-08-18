import React, { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider" 
import "./customer.css"

export const CustomerList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { customers, getCustomers } = useContext(CustomerContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("customerList: useEffect - getCustomers")
    getCustomers()
  }, [])


  return (
    <section className="customers">
      {
        customers.map(customer => {
          return (
            <div className="customer" id={`customer--${customer.id}`}>
              <div className="customer__name">
                Name: { customer.name }
              </div>
              <div className="customer__location">
                Address: { customer.address }
              </div>
            </div>
          )
        })
      }
    </section>
  )
}