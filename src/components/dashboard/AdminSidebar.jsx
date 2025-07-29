import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBuilding, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaCog, 
  FaRegCalendarAlt
} from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';

const AdminSidebar = () => {
  // Reusable style function for active/inactive NavLinks
  const navLinkStyle = (isActive) => 
    `flex items-center space-x-4 py-2.5 px-4 rounded transition-colors ${
      isActive ? "bg-teal-500 text-white" : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64">
      {/* Header */}
      <div className="bg-teal-600 h-16 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Employee MS</h3>
      </div>
      
      {/* Navigation Links */}
      <div className="px-4 py-6 space-y-2">
        <NavLink to="/admin-dashboard" end className={({ isActive }) => navLinkStyle(isActive)}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin-dashboard/employees" className={({ isActive }) => navLinkStyle(isActive)}>
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" className={({ isActive }) => navLinkStyle(isActive)}>
          <FaBuilding />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/admin-dashboard/leaves" className={({ isActive }) => navLinkStyle(isActive)}>
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>

        <NavLink to="/admin-dashboard/salary/add" className={({ isActive }) => navLinkStyle(isActive)}>
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>



        <NavLink to="/admin-dashboard/attendance" className={({ isActive }) => navLinkStyle(isActive)}>
          <FaRegCalendarAlt />
          <span>Attendance</span>
        </NavLink>


  

        <NavLink to="/admin-dashboard/attendance-report" className={({ isActive }) => navLinkStyle(isActive)}>
          <AiOutlineFileText />
          <span>Attendance Report</span>
        </NavLink>


        <NavLink to="/admin-dashboard/setting" className={({ isActive }) => navLinkStyle(isActive)}>
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
