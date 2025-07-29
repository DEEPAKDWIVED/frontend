import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const List = () => {
    const [leaves, setLeaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
const { userId } = useParams();
  const fetchLeaves = async () => {
    try {
        const url = user.role === "admin"
            ? "http://localhost:5000/api/leave"
            : `http://localhost:5000/api/leave/user/${user._id}`;
        
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },

        });
           console.log("API Response:", response.data); 
            if (response.data.success) {
                setLeaves(response.data.leaves);
            }
        } catch (error) {
            console.error("Error fetching leaves:", error.message);
            alert("Failed to fetch leaves. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
          console.log("User:", user);
        if (user && user._id) {
            fetchLeaves();
        }
    }, [user]);

    const getStatusBadge = (status) => {
        const base = "px-2 py-1 text-xs font-semibold rounded-full";
        switch (status.toLowerCase()) {
            case 'approved':
                return `${base} bg-green-100 text-green-700`;
            case 'rejected':
                return `${base} bg-red-100 text-red-700`;
            case 'pending':
                return `${base} bg-yellow-100 text-yellow-700`;
            default:
                return `${base} bg-gray-100 text-gray-700`;
        }
    };
    console.log("Leaves data:", leaves);


    const filteredLeaves = leaves
        .filter(leave =>
            leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leave.reason.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-[#598BAF] to-[#D3E9F3]">
            <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-gray-800">Manage Leaves</h3>
                    <p className="text-sm text-gray-500">Track your applied leaves here</p>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search by Leave Type or Reason"
                        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-teal-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {user.role === "employee" && (
                        <Link
                            to="/employee-dashboard/add-leave"
                            className="inline-block px-5 py-2 bg-green-600 hover:bg-green-900 text-white font-semibold rounded shadow"
                        >
                            + Add New Leave
                        </Link>
                    )}
                </div>

                {loading ? (
                    <p className="text-center text-gray-600">Loading leaves...</p>
                ) : filteredLeaves.length === 0 ? (
                    <p className="text-center text-gray-500">No leaves found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-700 bg-white rounded-md overflow-hidden shadow-sm">
                            <thead className="text-xs text-white uppercase bg-cyan-900">
                                <tr>
                                    <th className="px-6 py-3">SNO</th>
                                    <th className="px-6 py-3">Leave Type</th>
                                    <th className="px-6 py-3">From</th>
                                    <th className="px-6 py-3">To</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeaves.map((leave, index) => (
                                    <tr key={leave._id} className="bg-white border-b hover:bg-gray-50 transition-all duration-150">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{leave.leaveType}</td>
                                        <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{leave.reason}</td>
                                        <td className="px-6 py-4">
                                            <span className={getStatusBadge(leave.status)}>
                                                {leave.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default List;
