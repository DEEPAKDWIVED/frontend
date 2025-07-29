import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Add = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [leave, setLeave] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Set userId when user is loaded
    useEffect(() => {
        if (user && user._id) {
            setLeave({
                userId: user._id,
                leaveType: '',
                startDate: '',
                endDate: '',
                reason: '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        // Basic validation
        if (!leave.leaveType || !leave.startDate || !leave.endDate) {
            setError('Please fill all required fields');
            setIsSubmitting(false);
            return;
        }

        // Date validation
        if (new Date(leave.endDate) < new Date(leave.startDate)) {
            setError('End date cannot be before start date');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(
                'https://empbackend-steel.vercel.app/api/leave/add',
                leave,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                navigate('/employee-dashboard/leaves');
            }
        } catch (error) {
            setIsSubmitting(false);
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError('Something went wrong.');
            }
        }
    };

    if (!user || !leave) {
        return (
            <div className="text-center mt-10 text-gray-500 text-lg">
                Loading user info...
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Request for Leave</h2>
                <p className="text-gray-500 mt-2">Fill out the form to submit your leave request</p>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Leave Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Leave Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="leaveType"
                        value={leave.leaveType}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
                        required
                    >
                        <option value="">Select Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Maternity/Paternity">Maternity/Paternity Leave</option>
                        <option value="Bereavement">Bereavement Leave</option>
                    </select>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            From Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={leave.startDate}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            To Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={leave.endDate}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                </div>

                {/* Reason */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description <span className="text-gray-500">(Optional)</span>
                    </label>
                    <textarea
                        name="reason"
                        value={leave.reason}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
                        rows="4"
                        placeholder="Please provide details about your leave request..."
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center py-3 px-4 rounded-lg text-lg font-medium text-white ${
                            isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600'
                        }`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;
