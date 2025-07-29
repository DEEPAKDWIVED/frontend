import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Salary = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();
    let sno = 1;

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (q) => {
        const filteredRecords = salaries.filter((salary) =>
            salary.employeeId.toLowerCase().includes(q.toLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <div className= " bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="backdrop-blur-lg bg-white/80 rounded-xl shadow-xl ring-1 ring-blue-200 p-8">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-indigo-800 drop-shadow-sm">Salary History</h2>
                        <p className="text-gray-600 mt-2 text-lg">Track and manage all employee salary records</p>
                    </div>

                    <div className="flex justify-end mb-6">
                        <input
                            type="text"
                            placeholder="Search by Employee ID..."
                            className="border border-blue-300 px-4 py-2 w-64 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            onChange={(e) => filterSalaries(e.target.value)}
                        />
                    </div>

                    {filteredSalaries === null ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-60"></div>
                        </div>
                    ) : filteredSalaries.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg border border-blue-100 shadow-sm">
                            <table className="w-full text-sm text-left text-gray-700">
                                <thead className="text-xs uppercase bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800">
                                    <tr>
                                        <th className="px-6 py-3">SNO</th>
                                        <th className="px-6 py-3">Emp ID</th>
                                        <th className="px-6 py-3">Salary</th>
                                        <th className="px-6 py-3">Allowance</th>
                                        <th className="px-6 py-3">Deduction</th>
                                        <th className="px-6 py-3">Total</th>
                                        <th className="px-6 py-3">Pay Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-100 bg-white">
                                    {filteredSalaries.map((salary) => (
                                        <tr key={salary.id} className="hover:bg-blue-50 transition">
                                            <td className="px-6 py-4">{sno++}</td>
                                            <td className="px-6 py-4 font-semibold text-blue-700">
                                                {salary.employeeId.employeeId}
                                            </td>
                                            <td className="px-6 py-4 text-green-600 font-medium">
                                                ₹{salary.basicSalary}
                                            </td>
                                            <td className="px-6 py-4 text-blue-500">₹{salary.allowances}</td>
                                            <td className="px-6 py-4 text-red-500">₹{salary.deductions}</td>
                                            <td className="px-6 py-4 font-bold text-indigo-700">
                                                ₹{salary.netSalary}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(salary.payDate).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-gray-500 text-xl">No salary records found</div>
                            <svg
                                className="mx-auto h-16 w-16 text-gray-400 mt-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Salary;
