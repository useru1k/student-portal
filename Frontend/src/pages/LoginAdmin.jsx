import React, { useState } from 'react';
import { FaUserGraduate } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const navigate = useNavigate();

    const handleUserLogin = (e) => {
        e.preventDefault();
        navigate('/courses'); // Navigate to the user dashboard
    };

    return (
        <div className="flex items-center justify-center h-screen loginbg bg-fixed bg-cover bg-center overflow-hidden">
            <div className="relative w-[500px] h-[450px] glass border border-gray-300 rounded-xl shadow-xl flex items-center overflow-hidden">
                {/* User Login Form */}
                <div className="min-w-full p-10 h-full">
                    <form onSubmit={handleUserLogin}>
                        <h1 className="text-3xl text-center mb-6 text-gray-800 font-bold hover:scale-105 transition-transform">User Login</h1>
                        
                        <div className="relative w-full h-[50px] mb-8">
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                className="w-full h-full bg-gray-100 border-2 border-gray-300 outline-none rounded-full text-gray-800 px-5 pl-5 pr-12 placeholder-gray-500 transition-all duration-300 hover:border-gray-700 focus:border-gray-700"
                            />
                            <FaUserGraduate className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-800" />
                        </div>
                        
                        <div className="relative w-full h-[50px] mb-8">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full h-full bg-gray-100 border-2 border-gray-300 outline-none rounded-full text-gray-800 px-5 pl-5 pr-12 placeholder-gray-500 transition-all duration-300 hover:border-gray-700 focus:border-gray-700"
                            />
                            <RiLockPasswordFill className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-800" />
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-800 mb-4">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Remember me
                            </label>
                            <a href="#" className="hover:underline text-gray-600">Forgot password</a>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full h-[45px] bg-gray-700 text-white rounded-full font-semibold shadow-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
