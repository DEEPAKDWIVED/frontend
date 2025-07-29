import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/dashboard/NavBar'


const EmployeeDashboard = () => {
  return (
    <div className='flex'>
  <Sidebar/>
  <div className='flex-1 ml-64 bg-gray-100 min-h-screen'>
    <NavBar/>
    <Outlet/>
  </div>
  
  </div>
  )
}

export default EmployeeDashboard
