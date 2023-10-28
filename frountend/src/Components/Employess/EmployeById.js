import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { empDetail, employelist, getEmployeeById } from '../../Redux/Employee/EmployeeSlice';

export default function EmployeById() {
    const {id} = useParams();
    const dispatch =useDispatch();
    const [data,setdata]=useState({});
    useEffect(()=>{
        dispatch(getEmployeeById(id));
    },[id])
 const employeeData= useSelector(empDetail)
 console.log(employeeData)
  
  return (

    <>
    {
        employeeData.length<=0 ?(

            <h1>Loading...</h1>
        ):(
<div className='container'>
  <div className="card mb-3 mt-5 p-2" style={{width: "100%"}}>
  <div className="row g-0">
    <div className="col-md-4" >
      <img src={`http://localhost:5000/${employeeData.EmployeeImage}`} height={"400px"}  className="img-fluid img-thumbnail" alt="..."/>
      <Link to='/'><button className='btn btn-success btn-lg' >Home</button></Link>
    </div>
    
    <div className="col-md-8">
      <div className="card-body">
      <ol className="list-group list-group-numbered">
  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">FirstName</div>
      {employeeData.FirstName}
    </div>
    
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">LastName</div>
      {employeeData.LastName}
    </div>
  
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">Department</div>
      {employeeData.Department}
    </div>

  </li>
  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">Salary</div>
      {employeeData.Salary}
    </div>
  
  </li>
</ol>
      </div>
    </div>
  </div>
</div>
    </div>

        )

    }
    
    
    
    
    
    
    </>


    
  )
}
