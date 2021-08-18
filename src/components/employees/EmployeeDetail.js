import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { useParams } from "react-router-dom"

export const EmployeeDetail = () => {
    const { employees } = useContext(EmployeeContext)
    const [ employee, setEmployee] = useState({ location: {}, customer: {} })

    const { employeeId } = useParams();

    useEffect(() => {
        const thisEmployee = employees.find(e => e.id === parseInt(employeeId)) || { location: {}, customer: {} }

        setEmployee(thisEmployee)
    }, [employeeId])

    return (
        <section className="employee">
            <h3 className="employee__name">{ employee.name }</h3>
            <div className="employee__location">{ employee.location.name }</div>
        </section>
    )
}