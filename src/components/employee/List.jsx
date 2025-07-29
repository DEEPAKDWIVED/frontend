import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
const [filteredEmployees,setFilteredEmployees]=useState([])
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("https://empbackend-steel.vercel.app/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("API Response:", response.data.employees); // Debugging

        if (response.data.success) {
          const data = response.data.employees.map((emp, index) => ({
            _id: emp._id || emp.userId?._id,
            sno: index + 1, 
            dep_name: emp.department?.dep_name || "N/A",
            name: emp.userId?.name || "Unknown",
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
            profileImage: emp.userId?.profileImage 
              ? `https://empbackend-steel.vercel.app/${emp.userId.profileImage}`
              : "https://via.placeholder.com/150"
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.error("Employee fetch error:", error);
        alert(
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch employees"
        );
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

 const handleFilter = (e) => {
  const keyword = e.target.value.toLowerCase();
  const records = employees.filter((emp) =>
    emp.name.toLowerCase().includes(keyword)
  );
  setFilteredEmployees(records);
};


  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">Manage Employees</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search by Employee ID ..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full md:w-96 transition-all"
          onChange={handleFilter}
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Add New Employee
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          progressPending={empLoading}
          progressComponent={<div className="py-4">Loading employees...</div>}
          noDataComponent={<div className="py-8 text-gray-500 text-center">No employees found</div>}
          striped
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default List;