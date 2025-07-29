import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Add = () => {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);

const [formData,setFormData]=useState({});








    useEffect(() => {
        const getDepartments=async()=>{
    const departments = await fetchDepartments()
    setDepartments(departments)

        };
        getDepartments();
}, []);








const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
        setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
};




const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataObj = new FormData();
  Object.keys(formData).forEach((key) => {
    formDataObj.append(key, formData[key]);
  });

  try {
    const response = await axios.post(
      "http://localhost:5000/api/employee/add",
      formDataObj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      navigate("/admin-dashboard/employees"); // or "/employees" depending on flow
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
};






    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Employee</h2>
            <form onSubmit={handleSubmit}       className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            onChange={ handleChange}
                            placeholder="Enter full name"
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={ handleChange}
                            placeholder="Enter email address"
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={ handleChange}
                            placeholder="Create password"
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

{/* Mobile Number */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Mobile Number
  </label>
  <input
    type="text"
    name="mobile"
    onChange={ handleChange}
    placeholder="Enter mobile number"
    maxLength={10}
    onInput={(e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }}
    className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    required
  />
</div>















                    {/* Employee ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employee ID
                        </label>
                        <input
                            type="text"
                            name="employeeId"
                            onChange={ handleChange}
                            placeholder="Enter employee ID"
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dob"
                            onChange={ handleChange}
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                        </label>
                        <select
                            name="gender"
                            onChange={ handleChange}
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Marital Status
                        </label>
                        <select
                            name="maritalStatus"
                            onChange={ handleChange}
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Designation
                        </label>
                        <input
                            type="text"
                            name="designation"
                            onChange={ handleChange}
                            placeholder="Enter designation"
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                        </label>
                        <select
                            name="department"
                            onChange={ handleChange}
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        >
                            <option value="">Select Department</option>

                            {departments.map(dep=>(
                           <option    key={dep._id} value={dep._id}>   {dep.dep_name}</option>
                            ))};





                        </select>
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            name="role"
                               onChange={ handleChange}
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Salary
                        </label>
                        <input
                            type="number"
                            name="salary"
                            onChange={ handleChange}
                            placeholder="Enter salary amount"
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                        
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Image
                        </label>
                        <div className="mt-1 flex items-center">
                            <input
                                type="file"
                                name="image"
                                   onChange={ handleChange}
                                accept="image/*"
                                className="p-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;