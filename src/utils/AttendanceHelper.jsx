import axios from 'axios';
import React from 'react';

export const AttendanceHelper = ({ status,employeeId,statusChange }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "sick":
        return "bg-gray-200 text-gray-800";
      case "leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };






  const markEmployee = async (status, employeeId) => {
  const response = await axios.put(`http://localhost:5000/api/attendance/update/${employeeId}`, 
    { status }, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );


if(response.data.success){
  statusChange();
}


};


  return (
    <div>
      {status == null ? (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-full transition"
       onClick={()=>markEmployee("present",employeeId)}
       
       >
            Present
          </button>
          <button
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-full transition"
           onClick={()=>markEmployee("absent",employeeId)} >
            Absent
          </button>
          <button
            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-full transition"
          onClick={()=>markEmployee("sick",employeeId)}  >
            Sick
          </button>
          <button
            className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium rounded-full transition"
           onClick={()=>markEmployee("leave",employeeId)} >
            Leave
          </button>
        </div>
      ) : (
        <p
          className={`px-4 py-1 rounded-full text-sm font-semibold text-center w-fit mx-auto shadow-sm ${getStatusStyle(status)}`}
        >
          {status}
        </p>
      )}
    </div>
  );
};
