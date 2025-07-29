import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Setting = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // include logout if defined in authContext
    const [setting, setSetting] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // clear previous error

        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password not matched");
            return;
        }

        try {
            const response = await axios.put(
                "http://localhost:5000/api/setting/change-password",
                {
                    oldPassword: setting.oldPassword,
                    newPassword: setting.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                // Clear token & logout
                localStorage.removeItem("token");
                if (logout) logout(); // optional if context logout exists
                navigate("/login");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server error. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Old Password
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Old Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Setting;
