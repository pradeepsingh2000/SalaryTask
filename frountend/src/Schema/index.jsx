import * as Yup from "yup";
// Validation
export const AddSchema = Yup.object({
    FirstName:Yup.string().min(2).max(25).required("Please enter your FirstName"),
    LastName:Yup.string().min(2).max(25).required("Please enter your LastName"),
    Email:Yup.string().email().required("Please enter your Email"),
    WorkingHour:Yup.number().required("Please enter your Working hours"),
    SalaryType:Yup.string().required("Please choose salary type"),
    Phone:Yup.number().min(10).required("Please enter your phone number"),
    Department:Yup.string().required("Please enter your department"),
    
});

export const UpdateSchema = Yup.object({
    FirstName:Yup.string().min(2).max(25).required("Please enter your FirstName"),
    LastName:Yup.string().min(2).max(25).required("Please enter your LastName"),
    Email:Yup.string().email().required("Please enter your Email"),
    Phone: Yup.string().test('phone-number', 'Phone number must be exactly 10 digits', (value) => {
        return /^\d{10}$/.test(value || "");
      }).required("Please enter your phone number"),

});


