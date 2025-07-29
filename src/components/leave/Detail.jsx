import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeave(prev => ({ ...prev, status }));
         navigate('/admin-dashboard/leaves');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {leave ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#2c3e50]">
            🗂️ Leave Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Profile Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src={`http://localhost:5000/${leave.employeeId.userId?.profileImage}`}
                alt="Profile"
                className="rounded-full border-4 border-gray-200 w-52 h-52 object-cover shadow-xl"
                onError={(e) => {
                  const fallback = encodeURIComponent(leave.employeeId.userId?.name || "E");
                  e.target.src = `https://ui-avatars.com/api/?name=${fallback}&background=random&size=256&rounded=true&color=fff`;
                }}
              />
            </div>

            {/* Employee Info */}
            <div className="space-y-4 text-[16px]">
              {[
                ["Name", leave.employeeId.userId?.name],
                ["Employee ID", leave.employeeId.employeeId],
                ["Leave Type", leave.leaveType],
                ["Reason", leave.reason],
                ["Department", leave.employeeId.department?.dep_name],
                ["Start Date", new Date(leave.startDate).toLocaleDateString()],
                ["End Date", new Date(leave.endDate).toLocaleDateString()],
                ["Status", leave.status]
              ].map(([label, value], index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:space-x-4">
                  <p className="font-semibold min-w-[130px] text-gray-700">{label}:</p>
                  <p className="text-gray-800">{value || "N/A"}</p>
                </div>
              ))}

              {/* Status Change Buttons */}
              <div className="flex items-center space-x-3 pt-2">
                <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button 
                      className="px-3 py-1 bg-teal-300 hover:bg-teal-400 rounded-md"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button 
                      className="px-3 py-1 bg-red-300 hover:bg-red-400 rounded-md"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-lg text-gray-500">Loading...</div>
      )}
    </>
  );
};

export default Detail;