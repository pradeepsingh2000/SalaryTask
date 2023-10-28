import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAddEmployee, fetchDeleteEmployee, fetchEmployee, fetchEmployeeById, fetchUpdateEmployee } from "./EmployeeAPI";

export const STATUS= Object.freeze({
    IDEL:'idel',
    LOADING:"loading",
    SUCCESS:"success",
    FAIL:"fail"
});
const initialState = {
    status: STATUS.IDLE,
    total: 0,
    employee: [],
    OneEmp:[],
    message: '',
    isDelete:false,
    response:false,
    getUser:false
  };
export const getAllEmployee = createAsyncThunk("getAllEmployee",async()=>{
    console.log("hit slice");
    const response = await fetchEmployee();
    return response;
})

export const getEmployeeById = createAsyncThunk("getEmployeeById",async(id)=>{
    const response = await fetchEmployeeById(id);
    return response;
  
})

export const deleteEmployee= createAsyncThunk("deleteEmployee",async(id)=>{
const response = await fetchDeleteEmployee(id);
return response;
})

export const  updateEmployee = createAsyncThunk("updateEmployee",async ({ myForm, data }, thunkAPI)=>{
const response = await fetchUpdateEmployee(myForm,data.Id);
return response;
})

export const  addEmployee = createAsyncThunk("addEmployee",async(data)=>{
    const response = await fetchAddEmployee(data);
    return response;
 })
const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {

        setResponse(state){
            state.response=false;
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllEmployee.pending, (state) => {
          state.status = STATUS.LOADING;
        })
        .addCase(getAllEmployee.fulfilled, (state, action) => {
          state.status = STATUS.SUCCESS;
          state.employee = action.payload.data;
          state.total = action.payload.total;
        })
        .addCase(getAllEmployee.rejected, (state, action) => {
          state.status = STATUS.FAIL;
          state.message = action.payload;
        })
         .addCase(getEmployeeById.pending,(state)=>{
            state.status=STATUS.LOADING
            state.getUser=false;
        })
        .addCase(getEmployeeById.fulfilled,(state,action)=>{
            state.status=STATUS.SUCCESS;
            state.OneEmp=action.payload.data;
            state.getUser=true;
            
        })
        .addCase(getEmployeeById.rejected,(state,action)=>{
            state.status=STATUS.FAIL;
            state.message=action.payload.data.message;
            state.getUser=false;
        })
        .addCase(deleteEmployee.pending,(state)=>{
            state.status=STATUS.LOADING;
            state.isDelete=false;
            
        })
        .addCase(deleteEmployee.fulfilled,(state,action)=>{
            state.status=STATUS.SUCCESS;
            state.isDelete=true;
            
        })
        .addCase(deleteEmployee.rejected,(state,action)=>{
            state.status=STATUS.FAIL;
            state.isDelete=false;
            state.message=action.payload.data.message;
            
        })
        .addCase(addEmployee.pending,(state)=>{
            state.status=STATUS.LOADING
            state.response=false;
        })
        .addCase(addEmployee.fulfilled,(state,action)=>{
            state.status=STATUS.SUCCESS;
            state.response=true;
            
        })
        .addCase(addEmployee.rejected,(state,action)=>{
            state.status=STATUS.FAIL;
            state.message=action.payload.data.message;
        })
        .addCase(updateEmployee.pending,(state)=>{
            state.response=false;
            state.status=STATUS.LOADING
        })
        .addCase(updateEmployee.fulfilled,(state,action)=>{
            state.response=true;
            state.status=STATUS.SUCCESS;
            
        })
        .addCase(updateEmployee.rejected,(state,action)=>{
            state.response=false;
            state.status=STATUS.FAIL;
            // state.message=action.payload.data.message;
        })
    },
  });
  
export const { setResponse } = employeeSlice.actions
  
  export  default employeeSlice.reducer;

  // use as useSelector
export const Delete =(state)=>state.Employees.isDelete;
export const loader =(state)=>state.Employees.status;
export const message = (state)=>state.Employees.message
export const employelist=(state)=>state.Employees.employee
export const total=(state)=>state.Employees.total
export const Response =(state)=>state.Employees.response
export const GetById =(state)=>state.Employees.getUser
export const empDetail =(state)=>state.Employees.OneEmp
