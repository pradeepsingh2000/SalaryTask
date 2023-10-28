import { validationResult } from "express-validator";
import Employee from "../model/Employee";

interface EmployeeData {
    FirstName: string;
    LastName: string;
    Phone: string;
    Email: string;
    EmployeeImage?: string; // Optional property for EmployeeImage
  }
export class UserController  {

    //get All Employee
    static async getAllEmployess(req, res, next){

      try{
        const data = await Employee.find();
        const length= await Employee.countDocuments();
        res.status(200).json({
            data:data,
            total:length
        })
      }
      catch(err){
        res.status(400).json({
            status:false
        });

      }
    }
    // Add Employee
    static async AddEmployee(req, res, next){
        try{
            console.log(req.body)
            const data = new Employee({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Phone: req.body.Phone,
                WorkingHour: req.body.WorkingHour,
                Email: req.body.Email,
                Department:req.body.Department,
                SalaryType: req.body.SalaryType,
                EmployeeImage:  req.file.path,
                Salary: req.salary,
               
            })
            const imageUrl = data.EmployeeImage;
            const response = await new Employee(data).save().then((savedEmployee) => {
                console.log(savedEmployee);
            })
            .catch((err) => {
                console.error(err);
            });
            res.status(200).json(
               {
                data:response,
                status:true,
               }
            );
        }
        catch (err) {   
            res.status(400).json({
                data:err.message,
                status:false
            });

        }

    }
    //getEmployeeBYId
    static async getEmployee(req,res,next){
        try{
            const id= req.params.id;
            const user =await  Employee.findById({_id:id});
            res.status(200).json({
                data:user,
                status:true
            })

        }
        catch (err) {
            next(err);
        }

    }
    //UpdateEmployee
    
    static async UpdateEmployee(req,res,next){
        try {
            const data :EmployeeData ={
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Phone: req.body.Phone,
                Email: req.body.Email,
                         
            }
            if (req.file && req.file.path) {
                data.EmployeeImage = req.file.path;
              }
            console.log(data);
            const user = await Employee.findByIdAndUpdate(
              { _id: req.params.id },
              data,
              { new: true ,
                runValidators: true,
                useFindAndModify: false,}
            );
            await user.save();
            if(!user){
                res.status(404).json({
                    status: false,
                    message:"No use found"
                })
            }
         
            res.status(200).json({
                user: user,
                status:true
            });
          } catch (err) {
            res.status(400).json({
                data:err.message,
                status:false
            });
          }

    }
    //DeleteEmployee
    static async DeleteEmployee(req, res, next) {
        try {
            const employeeId = req.params.id;
    
            const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    
            if (!deletedEmployee) {
                // If the employee with the given ID is not found
                return res.status(404).json({
                    status: false,
                    message: "Employee not found",
                });
            }
    
            res.status(200).json({
                status: true,
                message: "Employee deleted successfully",
            });
        } catch (err) {
            res.status(400).json({
                status: false,
                message: err.message,
            });
        }
    }
    


  
}
