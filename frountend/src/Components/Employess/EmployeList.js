import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Total.css";
import swal from "sweetalert";
import {
  Delete,
  Response,
  deleteEmployee,
  employelist,
  getAllEmployee,
  loader,
  setResponse,
  total,
} from "../../Redux/Employee/EmployeeSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function EmployeList() {
  const dispatch = useDispatch();

  const load = useSelector(loader);
  const resp = useSelector(Delete);
  const [employess, setemp] = useState([]);
  useEffect(() => {
    dispatch(getAllEmployee());
  }, [dispatch, resp]);
  const emp = useSelector(employelist);

  useEffect(() => {
    setemp(emp);
    console.log(emp);
  }, [emp]);
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Want to delete this Employee",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteEmployee(id));
        swal("Poof! Employee deleted!", {
          icon: "success",
        });
      } else {
        swal("Employee is not deleted!");
      }
    });
  };
  const Total = useSelector(total);
  const emplen = {
    color: "white",
  };
  const circleStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  console.log(employess);

  return (
    <>
      {employess.length <= 0 ? (
        <Loader />
      ) : (
        <>
          <div className="row justify-content-evenly mt-3">
            <div className="col-4 mt-1">
              <Link to="/Add">
                <button className="btn btn-success btn-lg">
                  <AddCircleOutlineIcon fontSize="large" />
                  Add Employee
                </button>
              </Link>
            </div>
            <div className="col-4 ml-5">
              <div className="card">
                <div className="title">
                  <p className="title-text">TOTAL EMPLOYESS</p>
                </div>
                <div className=" d-flex justify-content-center">
                  <h1>{Total}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="m-2">
            <div className="mt-2">
              <table className="table table-bordered ">
                <thead
                  className="thead-primary "
                  style={{ textAlign: "center" }}
                >
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col"> Department</th>
                    <th scope="col">Salary</th>
                    <th scope="col">SalaryType</th>
                    <th scope="col">Workhour</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employess.map((e) => (
                    <tr key={e._id}>
                      <td>
                        <img
                          className="m-2"
                          src={`http://localhost:5000/${e.EmployeeImage}`}
                          height="40px"
                          width="50%"
                          alt={e.FirstName}
                        />
                      </td>
                      <td>{e.FirstName}</td>
                      <td>{e.LastName}</td>
                      <td>{e.Phone}</td>
                      <td>{e.Email}</td>
                      <td>{e.Department}</td>
                      <td>{e.Salary}</td>
                      <td>{e.SalaryType}</td>
                      <td>{e.WorkingHour}</td>
                      <td>
                        <Link to={`employee/${e._id}`}>
                          <button className="btn btn-primary m-1 btn-xs">
                            <RemoveRedEyeIcon fontSize="small" />
                            <span className="text-sm">View</span>
                          </button>
                        </Link>

                        <Link to={`update/${e._id}`}>
                          <button className="btn btn-warning m-1 btn-xs">
                            <EditIcon fontSize="small" />
                            <span className="text-sm">Edit</span>
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger btn-xs "
                          onClick={() => {
                            console.log("Button clicked!");
                            handleDelete(e._id);
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                          <span className="text-sm">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
