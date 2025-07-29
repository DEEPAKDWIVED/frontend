import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [departmentLoading, setDepartmentLoading] = useState(false);
  const onDepartmentDelete = (id) => {
    const updated = departments.filter((dep) => dep._id !== id);
    setDepartments(updated);
    setFilteredDepartments(updated); // 🔥 UI update ke liye zaruri hai
  };

  useEffect(() => {


    const fetchDepartments = async () => {
            setDepartmentLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
      finally {
        setDepartmentLoading(false); 
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>

      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-2 border rounded"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-2 bg-teal-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>
<div className="mt-5">
  {departmentLoading ? (
    <p className="text-center text-gray-500">Loading departments...</p>
  ) : (
    <DataTable
      columns={columns(onDepartmentDelete)}
      data={filteredDepartments}
      pagination
    />
  )}
</div>

    </div>
  );
};

export default DepartmentList;
