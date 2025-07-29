import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({...department, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/department/add", 
                department,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            
            if(response.data.success) {
                navigate("/admin-dashboard/departments");
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Add Department</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="dep_name" className="text-sm font-medium text-gray-700 mb-1">
                            Department Name
                        </label>
                        <input
                            type="text"
                            id="dep_name"
                            name="dep_name"
                            placeholder="Enter Department Name"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={department.dep_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Description"
                            rows="4"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={department.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                    >
                        Add Department
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;