import mongoose, { model } from "mongoose";


const employeeSchema = new mongoose.Schema({

    FirstName:{
        type:String,
        required:[true,"this FirstName is required"]

    },
    LastName:{
        type:String,
        required:[true,"this LastName is required"],
    },
    EmployeeImage:{
        type:String,
        require:[true,"this EmployeeImage is required"],
    },
    Phone:{
        type:Number,
        required:[true,"this Phone is required"],
    },
    Email:{
        type:String,
        required:[true,"this Email is required"]
    },
    SalaryType:{
        type:String,
        required:[true,"this SalaryType is required"]
    },
    Salary:{
        type:Number,
        required:[true,"this Salary is required"]
    },
    Department:{
        type:String,
        required:[true,"this Department is required"]
    },
    WorkingHour:{
        type:Number,
        required:[true,"this WorkingHour is required"]
    },
   
   
    
})

export default model ('Employess',employeeSchema);