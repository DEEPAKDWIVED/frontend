import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");

  const fetchReport = async () => {
    try {
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) query.append("date", dateFilter);

      const response = await axios.get(`http://localhost:5000/api/attendance/report?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setReport(response.data.groupData);
      }
    } catch (error) {
      console.error("Failed to fetch report:", error.message);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [limit, skip, dateFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">📅 Attendance Report</h1>
          <p className="text-gray-600">View attendance records grouped by date</p>
        </div>

        {/* Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 w-full md:w-60"
          />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
              disabled={skip === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setSkip((prev) => prev + limit)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Next
            </button>
          </div>
        </div>

        {/* Report Data */}
        {Object.keys(report).length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            🚫 No attendance data available.
          </div>
        ) : (
          Object.entries(report).map(([date, records]) => (
            <div
              key={date}
              className="mb-6 p-5 border border-gray-200 rounded-2xl shadow-lg bg-white transition hover:shadow-xl"
            >
              <h2 className="text-lg font-bold text-indigo-600 mb-4">{date}</h2>
              <ul className="divide-y divide-gray-100">
                {records.map((item, idx) => (
                  <li key={idx} className="py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="text-sm text-gray-800">
                      <span className="font-semibold">{item.employeeName}</span> ({item.employeeId})
                      <span className="ml-2 text-gray-500">| {item.departmentName}</span>
                    </div>
                    <span
                      className={`mt-1 sm:mt-0 text-sm font-semibold px-3 py-1 rounded-full w-fit ${
                        item.status === "present"
                          ? "bg-green-100 text-green-700"
                          : item.status === "absent"
                          ? "bg-red-100 text-red-700"
                          : item.status === "sick"
                          ? "bg-gray-100 text-gray-700"
                          : item.status === "leave"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AttendanceReport;
