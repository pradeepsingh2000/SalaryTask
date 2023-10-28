
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import EmployeList from './Components/Employess/EmployeList';
import EmployeeUpdate from './Components/Employess/EmployeeUpdate';
import AddEmployee from './Components/Employess/AddEmployee';
import pageNotFound from './Components/Employess/pageNotFound';
import EmployeById from './Components/Employess/EmployeById';
function App() {
  return (
   <BrowserRouter>
   <Routes>
   
    
    <Route path="/" element={<EmployeList/>}/>
    <Route extact path="/home" Component={ EmployeList}/>
    <Route extact path="/Add" Component={AddEmployee}/>
    <Route extact path="/update/:id" Component={EmployeeUpdate}/>
    <Route extact path="/employee/:id" Component={EmployeById}/>
    <Route path="*" element={<pageNotFound/>}/>
   </Routes>
   </BrowserRouter>
    
  );
}

export default App;
