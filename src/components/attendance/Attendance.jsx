import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AttendanceHelper } from "../../utils/AttendanceHelper";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(false);




const  statusChange=()=>{
  fetchAttendance();
}




  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        const data = response.data.attendance.map((att, index) => ({
          employeeId: att.employeeId.employeeId || "N/A",
          sno: index + 1,
          name: att.employeeId?.userId?.name || "Unknown",
          department: att.employeeId?.department?.dep_name || "N/A",
          status: att.status || null,
        }));

        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.error("Attendance fetch error:", error);
      alert(
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const records = attendance.filter((att) =>
      att.name.toLowerCase().includes(keyword)
    );
    setFilteredAttendance(records);
  };

  const columns = [
    {
      name: "S No",
      selector: (row) => row.sno,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Emp ID",
      selector: (row) => row.employeeId,
      sortable: true,
      width: "150px",
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
      width: "150px",
    },
     
    {
      name: "Status",
      cell: (row) => <AttendanceHelper status={row.status} employeeId={row.employeeId}  statusChange={statusChange} />,
      center: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
  {/* Header Section */}
  <div className="text-center mb-10">
    <h3 className="text-4xl font-extrabold text-gray-900">Attendance Panel</h3>
    <p className="text-gray-500 mt-2 text-sm">Track and manage employee attendance effectively</p>
  </div>

  {/* Controls Section */}
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white border border-gray-200 rounded-xl shadow-lg p-6">
    {/* Search Input */}
    <input
      type="text"
      placeholder="🔍 Search by Employee Name ..."
      className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2
        focus:ring-teal-500 focus:border-transparent w-full md:w-96 transition-all shadow-sm"
      onChange={handleFilter}
    />

    {/* Date Tag */}
    <div className="border border-blue-500 rounded-full bg-blue-100 text-blue-800 font-bold text-xl px-6 py-2 shadow-sm">
      Mark Employees for <span className="font-mono">{new Date().toISOString().split("T")[0]}</span>
    </div>

    {/* Report Button */}
    <Link
      to="/admin-dashboard/attendance-report"
      className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-500 to-green-500
        hover:from-teal-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md transition-all"
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
      Attendance Report
    </Link>
  </div>

  {/* Table Section */}
  <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
    <DataTable
      columns={columns}
      data={filteredAttendance}
      pagination
      progressPending={loading}
      progressComponent={<div className="py-4 text-sm text-gray-600">⏳ Loading attendance...</div>}
      noDataComponent={<div className="py-8 text-gray-500 text-center">🚫 No records found</div>}
      striped
      highlightOnHover
    />
  </div>
</div>
  );
};
export default Attendance;
