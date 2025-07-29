import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "N/A",
          leaveType: leave.leaveType,
          department: leave.employeeId?.department?.dep_name || "N/A",
          days:
            (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24) +
            1,
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error.message);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const keyword = e.target.value.toLowerCase();
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(keyword)
    );
    setFilteredLeaves(data);
  };

 const filterByButton = (status) => {
    const keyword = status.toLowerCase();
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(keyword)
    );
    setFilteredLeaves(data);
  };


  return (
    <>
      <div className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold">Manage Leaves</h3>
        </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search By Emp Id"
            className="px-4 py-1 border rounded-md"
            onChange={filterByInput}
          />
          <div className="space-x-3">
            <button className="px-5 py-2 text-lg font-semibold bg-yellow-600 text-white hover:bg-slate-700 rounded-full shadow transition duration-200"
            onClick={()=>filterByButton("pending")}>
              Pending
            </button>
            <button className="px-5 py-2 text-lg font-semibold bg-lime-600 text-white hover:bg-teal-700 rounded-full shadow transition duration-200"
              onClick={()=>filterByButton("Approved")}>
              Approved
            </button>
            <button className="px-5 py-2 text-lg font-semibold bg-red-600 text-white hover:bg-red-800 rounded-full shadow transition duration-200"
              onClick={()=>filterByButton("Rejected")}>
              Rejected
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredLeaves}
          progressPending={loading}
          pagination
        />
      </div>
    </>
  );
};

export default Table;
