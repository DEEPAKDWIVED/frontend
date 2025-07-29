import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBuilding, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaCog, 
} from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const Sidebar = () => {
  const {user}=useAuth();
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
        <NavLink to="/employee-dashboard" end className={({ isActive }) => navLinkStyle(isActive)}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({ isActive }) => navLinkStyle(isActive)}>
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({ isActive }) => navLinkStyle(isActive)}>
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({ isActive }) => navLinkStyle(isActive)}>
          <FaCalendarAlt />
          <span>Salary</span>
        </NavLink>


         

        <NavLink to="/employee-dashboard/setting" className={({ isActive }) => navLinkStyle(isActive)}>
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
