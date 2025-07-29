import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const {id} = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    employeeId: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
  });

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departments = await fetchDepartments();
        setDepartments(departments);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        toast.error("Failed to load departments");
      }
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const deptId = e.target.value;
    setFormData(prev => ({ ...prev, department: deptId, employeeId: "" }));

    try {
      const emps = deptId ? await getEmployees(deptId) : [];
      setEmployees(Array.isArray(emps) ? emps : []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setEmployees([]);
      toast.error("Failed to load employees");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/salary/add",
        {
          ...formData,
          basicSalary: Number(formData.basicSalary),
          allowances: Number(formData.allowances || 0),
          deductions: Number(formData.deductions || 0),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Salary added successfully!");
        navigate("/admin-dashboard/employees");
      } else {
        toast.error(response.data.message || "Failed to add salary");
      }
    } catch (error) {
      console.error("Error adding salary:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Error adding salary");
      } else {
        toast.error("Error adding salary");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-xl shadow-2xl border border-gray-100">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Add Employee Salary</h2>
        
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Selection */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              onChange={handleDepartment}
              value={formData.department}
              className="mt-3 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Employee Selection */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee <span className="text-red-500">*</span>
            </label>
            <select
              name="employeeId"
              onChange={handleChange}
              value={formData.employeeId}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              required
              disabled={!formData.department}
            >
              <option value="">{formData.department ? "Select Employee" : "Select Department First"}</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.userId?.name || emp.employeeId}
                </option>
              ))}
            </select>
          </div>

          {/* Basic Salary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Basic Salary <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                className="mt-1 pl-8 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Allowances */}
          <div className="bg-green-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowances
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                className="mt-1 pl-8 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-red-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deductions
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                className="mt-1 pl-8 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 shadow-sm"
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Pay Date */}
          <div className="bg-purple-50 p-4 rounded-lg md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pay Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="payDate"
              value={formData.payDate}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Add Salary'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;