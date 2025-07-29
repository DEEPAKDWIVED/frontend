import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';


const Summary= () => {
    const {user}=useAuth();
    return (
        <div className='p-6'>
        <div className="rounded-lg flex bg-white shadow-sm">
            <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4 `}>
                <FaUser/>
            </div>
            <div className="pl-4 py-3">
                <p className="text-xl font-semibold text-gray-500">Welcome Back 😊</p>
                <p className="text-xl font-bold">{user.name}</p>
            </div>
        </div>
        </div>
    );
};

export default Summary;