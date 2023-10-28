

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import swal from "sweetalert";
import { GetById, Response, empDetail, getEmployeeById, loader, setResponse, updateEmployee } from '../../Redux/Employee/EmployeeSlice';
import { useFormik } from "formik";
import { UpdateSchema } from '../../Schema';
export default function EmployeeUpdate() {
const {id} = useParams()
const [data,setdata]=useState({});
const dispatch = useDispatch();
const Load =useSelector(loader);
const navigate = useNavigate();
useEffect(()=>{
dispatch(getEmployeeById(id));
  },[dispatch,id])

  console.log('call')
  const User = useSelector(empDetail)

const [oldImage,getImage]=useState(User.EmployeeImage)
const [preview,setPreView]=useState(null)
const [Image , SetImage]=useState()
const [initailValue,setinit]= useState()

const resp=useSelector(Response)
useEffect(()=>{
  if(resp){
   
      swal("Update!", "Employee Updated SuccesFul", "success");
      dispatch(setResponse());
      navigate("/");
    
  }

},[resp])

useEffect(() => {
  setinit(User); 
}, [User]);
const PicUpload = (e) => {
  const file = e.target.files[0];
  console.log(file);
  setPreView(URL.createObjectURL(file))
  SetImage(file);
};
const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues:!initailValue?'':initailValue,
      enableReinitialize:true,
      validationSchema: UpdateSchema,
      onSubmit: (values) => {
        const myForm = new FormData();
        myForm.append("FirstName", values.FirstName);
        myForm.append("LastName", values.LastName);
        myForm.append("Email", values.Email);
        myForm.append("Phone", values.Phone);
        if (preview) {
          myForm.append("EmployeeImage", Image);
        }
        // const {ID} = useParams()\
      const data ={Id:id}
        console.log(data.Id)
        dispatch(updateEmployee({ myForm, data }));

       
      },
    });

    console.log(errors)
  return (

    <>

    {
    Load==="loading"?(<h1>Loading</h1>):(

        <div>
   
        <div className='container'>
        <form className="row g-3 mt-5 " onSubmit={handleSubmit} >
        <div className="col-md-6">
      <label for="inputEmail4" className="form-label">FirstName</label>
      <input type="text" className="form-control" onChange={handleChange}  name="FirstName" value={values.FirstName} />
    </div>
    <div className="col-md-6">
      <label for="inputPassword4" className="form-label">LastName</label>
      <input type="text" className="form-control" onChange={handleChange} name="LastName" value={values.LastName} />
    </div>
    <div className="col-md-6">
      <label for="inputEmail4" className="form-label">Email</label>
      <input type="email" className="form-control" onChange={handleChange} name="Email" value={values.Email} />
    </div>
    <div className="col-md-6">
      <label for="inputPassword4" className="form-label">Phone</label>
      <input type="text" className="form-control" id="inputPassword4" onChange={handleChange} name="Phone" value={values.Phone}/>
    </div>
   
   
  
    <div className="col-12 flex">
      <div>
        {
          preview ?  <img src={ preview}  height={"50px"} onChange={handleChange} name="EmployeeImage" width={"70px"}/>:
          <img src={`http://localhost:5000/${values.EmployeeImage}` }  onChange={handleChange} name="EmployeeImage" height={"50px"} width={"70px"}/>
  
        }
       
        
      </div>
  
    
    <input class="form-control form-control-lg" id="formFileLg" onChange={PicUpload} type="file"/>
  </div>
  <div className="col-12">
      <button type="submit" className="btn btn-primary">Update</button>
    </div>
  </form>
        </div>
        
      </div>
    
      )

    }
    </>
   

)
  }

