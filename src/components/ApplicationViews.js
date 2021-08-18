import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./locations/LocationProvider"
import { LocationList } from "./locations/LocationList"
import { LocationForm } from "./locations/LocationForm"
import { LocationDetail } from "./locations/LocationDetail"
// continue building location add button
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalDetail } from "./animal/AnimalDetail"
import { AnimalSearch } from "./animal/AnimalSearch"
import { EmployeeProvider } from "./employees/EmployeeProvider"
import { EmployeeList } from "./employees/EmployeeList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { EmployeeDetail } from "./employees/EmployeeDetail"
import { CustomerProvider } from "./customers/CustomerProvider"
import { CustomerList } from "./customers/CustomerList"


export const ApplicationViews = () => {
    return (
        <>


            <LocationProvider>
                <AnimalProvider>
                    <CustomerProvider>
                        <EmployeeProvider>
                            <Route exact path="/locations">
                                <LocationList />
                            </Route>

                            <Route path="/locations/detail/:locationId(\d+)">
                                <LocationDetail />
                            </Route> 

                            <Route  path="/locations/create">
                                <LocationForm />
                            </Route>

                            <Route path="/locations/edit/:locationId(\d+)">
                                <LocationForm />
                            </Route>



                            <Route exact path="/animals">
                                <AnimalSearch />
                                <AnimalList />
                            </Route>

                            
                            <Route  path="/animals/detail/:animalId(\d+)">
                                <AnimalDetail />
                            </Route>

                            <Route  path="/animals/edit/:animalId(\d+)">
                                <AnimalForm />
                            </Route>
                            


                            <Route  path="/animals/create">
                                <AnimalForm />
                            </Route>



                            <Route path="/customers">
                                <CustomerList />
                            </Route>



                            <Route exact path="/employees">
                                <EmployeeList />
                            </Route>

                            <Route path ="/employees/detail/:employeeId(\d+)">
                                <EmployeeDetail />
                            </Route>

                            <Route  path="/employees/create">
                                <EmployeeForm />
                            </Route>




                        </EmployeeProvider>
                    </CustomerProvider>
                </AnimalProvider>
            </LocationProvider>
        </>
    )
}
