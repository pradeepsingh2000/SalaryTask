import React, { useEffect, useState } from "react";
import "./AddEmployee.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Response,
  addEmployee,
  setResponse,
} from "../../Redux/Employee/EmployeeSlice";
import swal from "sweetalert";
import { useFormik } from "formik";
import { AddSchema } from "../../Schema";

export default function AddEmployee() {
  const navigate = useNavigate();
  const dispatch = new useDispatch();
  const [EmployeeImage, setEmployeeImage] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.jpeg");
  const resp = useSelector(Response);
  const initialValues = {
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    WorkingHour: "",
    SalaryType: "",
    Department: "",
    EmployeeImage: "",
  };

  const warn = {
    color: "red",
    fontSize: "10px",
  };

  console.log(resp, "this is response");
  useEffect(() => {
    if (resp) {
      swal("Added!", "Employee Added SuccesFul", "success");
      dispatch(setResponse());
      navigate("/");
    }
  }, [resp]);
  const PicUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setAvatarPreview(URL.createObjectURL(file));
    setEmployeeImage(file);
  };
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  const formStyle = {
    width: "600px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "#f9f9f9",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AddSchema,
      onSubmit: (values) => {
        const myForm = new FormData();
        myForm.append("FirstName", values.FirstName);
        myForm.append("LastName", values.LastName);
        myForm.append("Email", values.Email);
        myForm.append("Phone", values.Phone);
        myForm.append("Department", values.Department);
        myForm.append("WorkingHour", values.WorkingHour);
        myForm.append("EmployeeImage", EmployeeImage);
        myForm.append("SalaryType", values.SalaryType);
        console.log(myForm);
        dispatch(addEmployee(myForm));
      },
    });

  return (
    <div className="container">
      <div style={divStyle}>
        <form className="form" style={formStyle} onSubmit={handleSubmit}>
          <p className="title">Add Employee </p>
          <div className="flex">
            <label>
              <input
                required=""
                placeholder=""
                type="text"
                name="FirstName"
                value={values.FirstName}
                onChange={handleChange}
                onBlur={handleBlur} 
                className="input"
              />
               <span>FirstName</span>
            </label>
            {touched.FirstName && errors.FirstName ? (
              <p style={warn}>{errors.FirstName}</p>
            ) : null}
            <label>
              <input
                required=""
                placeholder=""
                type="text"
                name="LastName"
                value={values.LastName}
                onChange={handleChange}
                onBlur={handleBlur} 
                className="input"
              />
              <span>LastName</span>
            </label>
            { errors.LastName && touched.LastName ? (
              <p style={warn}>{errors.LastName}</p>
            ) : null}
          </div>
          <div className="flex">
            <label>
              <input
                required=""
                placeholder=""
                type="email"
                name="Email"
                value={values.Email}
                onBlur={handleBlur} 
                onChange={handleChange}
                className="input"
              />
              <span>Email</span>
            </label>
            {touched.Email && errors.Email ? (
              <p style={warn}>{errors.Email}</p>
            ) : null}
            <label>
              <input
                required=""
                placeholder=""
                type="number"
                name="Phone"
                onBlur={handleBlur} 
                value={values.Phone}
                onChange={handleChange}
                className="input"
              />
              <span>Phone</span>
            </label>
            {touched.Phone && errors.Phone ? (
              <p style={warn}>{errors.Phone}</p>
            ) : null}
          </div>

          <div className="flex">
            <label>
              <input
                required=""
                placeholder=""
                type="text"
                name="WorkingHour"
                onBlur={handleBlur} 
                value={values.WorkingHour}
                onChange={handleChange}
                className="input"
              />
              <span>Workinghour</span>
            </label>
            {touched.WorkingHour && errors.WorkingHour ? (
              <p style={warn}>{errors.WorkingHour}</p>
            ) : null}

            <label>
              <input
                required=""
                placeholder=""
                type="text"
                value={values.Department}
                onBlur={handleBlur} 
                name="Department"
                onChange={handleChange}
                className="input"
              />
              <span>Department</span>
            </label>
            {touched.Department && errors.Department ? (
              <p style={warn}>{errors.Department}</p>
            ) : null}
          </div>

          <label>
            <span>Select Department</span>
          </label>
          <select
            className={"form-control"}
            name="SalaryType"
            value={values.SalaryType}
            onBlur={handleBlur} 
            onChange={handleChange}
          >
            <option>--Select--</option>
            <option value="Type-1">Type-1</option>
            <option value="Type-2">Type-2</option>
            <option value="Type-3">Type-3</option>
          </select>

          <div id="registerImage">
            <label style={{ display: "flex" }}>
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                height={"40px"}
                width={"40px"}
              />
              <input
                style={{ display: "inline", margin: "8px" }}
                type="file"
                name="avatar"
                accept="image/*"
                onChange={PicUpload}
              />
            </label>
          </div>
          {Object.keys(errors).length !== 0 ? (
            <button type="button" className="btn btn-lg btn-primary" disabled>
              disabled
            </button>
          ) : (
            <button className="submit">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
}
