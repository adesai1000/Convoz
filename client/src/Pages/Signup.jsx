/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/Logo.png';

export default function Signup() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await axios.post('http://localhost:3000/signup', {
                username,
                email,
                password,
            }, { withCredentials: true });

            if (response.data.success) {
                toast.success(response.data.message)
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            } else {
                toast.error(response.data.message);

            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-10 lg:px-8 bg-black text-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={Logo}
                        alt="Convoz"
                    />
                    <h2 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight">
                        Create Account
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6">
                                Username*
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    placeholder='JohnAppleseed'
                                    className="block w-full rounded-md border-0 py-2.5 px-2.5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1976D2] sm:text-sm sm:leading-6 bg-white text-black"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6">
                                Email*
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder='example@gmail.com'
                                    className="block w-full rounded-md border-0 py-2.5 px-2.5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1976D2] sm:text-sm sm:leading-6 bg-white text-black"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder='Required'
                                    className="block w-full rounded-md border-0 py-2.5 px-2.5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1976D2] sm:text-sm sm:leading-6 bg-white text-black"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#1976D2] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                            >
                                Sign me up!
                            </button>
                        </div>
                    </form>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        transition:Bounce
                    />
                    <p className="mt-10 text-center text-sm">
                        Already have an account?{' '}
                        <a className="font-semibold leading-6 hover:text-indigo-500">
                            <Link to='/login' className="text-[#1976D2]">Sign in.</Link>
                        </a>
                    </p>
                </div>
            </div >
        </>
    )
}
