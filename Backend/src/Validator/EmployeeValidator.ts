import {body,query} from 'express-validator';

export class EmployeeValidation{

    static AddUserValidation(req,res,next){
      
        return[
           
            body('Email','Email must be required').isEmail(),
            body('Firstname','Name must be required').isString(),
            body('LastName','Name must be required').isString(),
            body('Workhour','Workhour must be required').isNumeric(),
            body('Department','Department must be required').isString(),
            body('SalaryType','Salary must be required').isString(),
            body('Phone','Phone must be required').isNumeric()
           
        ]
    }
}