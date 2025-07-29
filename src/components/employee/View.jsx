import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://empbackend-steel.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image Section */}
            <div className="flex justify-center md:justify-start">
              <img
                src={`https://empbackend-steel.vercel.app/${employee.userId?.profileImage}`}
                alt={`${employee.userId?.name}'s profile`}
                className="rounded-full border-4 border-gray-200 w-48 h-48 object-cover shadow-lg"
                onError={(e) => {
                  const fallback = encodeURIComponent(employee.userId?.name || "E");
                  e.target.src = `https://ui-avatars.com/api/?name=${fallback}&background=random&size=256&rounded=true&color=fff`;
                }}
              />
            </div>

            {/* Employee Details Section */}
            <div className="space-y-5">
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <p className="text-lg font-bold min-w-[120px]">Name:</p>
                  <p className="font-medium">{employee.userId?.name || 'N/A'}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <p className="text-lg font-bold min-w-[120px]">Employee ID:</p>
                  <p className="font-medium">{employee.employeeId || 'N/A'}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <p className="text-lg font-bold min-w-[120px]">Email:</p>
                  <p className="font-medium">{employee.userId?.email || 'N/A'}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <p className="text-lg font-bold min-w-[120px]">Mobile Number:</p>
                  <p className="font-medium">{employee.mobile || 'N/A'}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <p className="text-lg font-bold min-w-[120px]">Date of Birth:</p>
                  <p className="font-medium">
                    {employee.dob ? new Date(employee.dob).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <p className="text-lg font-bold min-w-[120px]">Gender:</p>
                  <p className="font-medium">{employee.gender || 'N/A'}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <p className="text-lg font-bold min-w-[120px]">Marital Status:</p>
                  <p className="font-medium">{employee.maritalStatus || 'N/A'}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <p className="text-lg font-bold min-w-[120px]">Designation:</p>
                  <p className="font-medium">{employee.designation || 'N/A'}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <p className="text-lg font-bold min-w-[120px]">Department:</p>
                  <p className="font-medium">{employee.department?.dep_name || 'N/A'}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <p className="text-lg font-bold min-w-[120px]">Salary:</p>
                  <p className="font-medium">₹ {employee.salary || 'N/A'}</p>
                </div>
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

export default View;
