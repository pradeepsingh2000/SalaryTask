import axios from "axios";
import { url } from "../../Const";

//getAll Employee
export function fetchEmployee() {
  console.log("hit");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${url}/getall`);
      console.log(response.data);
      const responseData = await response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

//getEmployeeById
export function fetchEmployeeById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${url}/Employee/${id}`);

      const responseData = response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

//Add
export function fetchAddEmployee(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${url}/addEmployee`, data);
      const responseData = response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}
//Update
export function fetchUpdateEmployee(data, id) {
  console.log('fetchUpdateEmploye', id);
  return new Promise(async (resolve, reject) => {
    try {
     

      const response = await axios.patch(
        `${url}/updateEmployee/${id}`,
        data
      );
      const responseData = response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        reject(error.response.data);
      } else {
        console.log(error.response.data);
        reject(error);
      }
    }
  });
}
// delete
export function fetchDeleteEmployee(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`${url}/deleteEmployee/${id}`);
      const responseData = response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}
