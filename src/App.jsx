import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Salary from "./components/employee/Salary";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/Add"
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import LeaveDetail from "./components/leave/Detail"
import Attendance from "./components/attendance/Attendance";
import AttendanceReport from "./components/attendance/AttendanceReport";
function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }
    > 
      <Route index element ={<AdminSummary/>}></Route>
         <Route path="/admin-dashboard/departments" element ={<DepartmentList/>}></Route>
            <Route path="/admin-dashboard/add-department" element ={<AddDepartment/>}></Route>
                <Route path="/admin-dashboard/edit-department/:id" element ={<EditDepartment/>}></Route>
                    <Route path="/admin-dashboard/employees" element ={<List/>}></Route>
                       <Route path="/admin-dashboard/add-employee" element ={<Add/>}></Route>
                          <Route path="/admin-dashboard/view-employee/:id" element ={<View/>}></Route>
                            <Route path="/admin-dashboard/salary-employee/:id" element ={<Salary/>}></Route>
                              <Route path="/admin-dashboard/edit-employee/:id" element ={<Edit/>}></Route>
                                <Route path="/admin-dashboard/leave-employee/:id" element ={<LeaveList/>}></Route>
                                    <Route path="/admin-dashboard/salary/add" element ={<AddSalary/>}></Route>
                                       <Route path="/admin-dashboard/leaves" element ={<Table/>}></Route>
                                          <Route path="/admin-dashboard/leaves/:id" element ={<LeaveDetail/>}></Route>
                                                <Route path="/admin-dashboard/setting" element={<Setting/>}></Route>
                                                      <Route path="/admin-dashboard/attendance" element={<Attendance/>}></Route>
                                                           <Route path="/admin-dashboard/attendance-report" element={<AttendanceReport/>}></Route>
    </Route>
      

      <Route
        path="/employee-dashboard"
        element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin","employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        } 
           
      >
           <Route index element ={<Summary/>} />
   <Route path="/employee-dashboard/profile/:id" element={<View/>}></Route>
      <Route path="/employee-dashboard/leaves/:id" element={<LeaveList/>}></Route>
           <Route path="/employee-dashboard/add-leave" element={<AddLeave/>}></Route>
 <Route path="/employee-dashboard/salary/:id" element={<Salary/>}></Route>
 
 <Route path="/employee-dashboard/setting" element={<Setting/>}></Route>

 <Route path="/employee-dashboard/leaves" element={<LeaveList/>}></Route>



           </Route>

      {/* Add unauthorized page route */}
      <Route
        path="/unauthorized"
        element={<div><h2>Unauthorized Access</h2><p>You do not have permission to view this page.</p></div>}
      />
    </Routes>
    
  );
}

export default App;
