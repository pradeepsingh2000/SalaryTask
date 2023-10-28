export class Salary{
    // checks the salary
    static calSalary  (req,res,next){

        const PerHourSalary=400;
        const fixedSalary=30000;
       
       if(req.body.SalaryType==="Type-1"){
        console.log('hit-1')
        var salary =req.body.WorkingHour*PerHourSalary;
       }
       else if(req.body.SalaryType=="Type-3"){
        if(req.body.WorkingHour <100){
            var amount=0.75 * PerHourSalary
            var salary =req.body.WorkingHour*amount;
        }
        else{
            var salary= fixedSalary;
        }
       }
       else{
        var salary =fixedSalary;
       }
       console.log("Salary",salary);
       req.salary=salary;
       next();
    }
}