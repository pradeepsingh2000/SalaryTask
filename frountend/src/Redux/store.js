import { configureStore } from "@reduxjs/toolkit";
import EmployeeSlice from "./Employee/EmployeeSlice";


// store
const store =configureStore({
    reducer:{
        Employees:EmployeeSlice
    }
})

export default store;