import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Axios from "axios";
import { toast } from "react-toastify";

export default function Signin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            setLoading(true);
            const response = await Axios.post(
                "https://convoz.onrender.com/login",
                {
                    username,
                    password,
                },
                { withCredentials: true }
            );
            if (response.data.success) {
                toast.success("Signed in!");
                navigate("/home");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        }
        setLoading(false);
    };

    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black text-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center">
                    <img className="mx-auto h-20 w-auto" src={Logo} alt="Convoz" />
                    <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white">
                        Sign In
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Username*
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    placeholder="JohnAppleseed"
                                    required
                                    className="block w-full rounded-md border-0 py-2.5 px-2.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1976D2] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
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
                                    placeholder="Required"
                                    className="block w-full rounded-md border-0 py-2.5 px-2.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1976D2] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#1976D2] px-3 py-2.5 text-sm font-bold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-100"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120.708 15H16v4.708a7.963 7.963 0 01-2-1.416V17h-2v2.292zM16 9v2h2a6.988 6.988 0 01-.164 1.514L17.586 13.1l1.414 1.414L20 12.414 18.414 11l-1.414 1.414.022.023A6.996 6.996 0 0118 9h-2zm-8-2h2V5a6.988 6.988 0 01.164-1.514L6.414 2.9 7.828 1.486 9.242 3.9 7.828 5.314l-.023-.023A6.996 6.996 0 016 7v2zm-2 8H2v-2a6.988 6.988 0 01.164-1.514L2.9 10.414 1.486 9l1.414-1.414.022.023A6.996 6.996 0 014 7h2v2H4a4 4 0 00-3.864 3.15L.15 11.864A4 4 0 002 17v2zm20-2h-2v2a6.996 6.996 0 01-1.65 4.486l-.023-.022-1.414-1.414 1.414-1.414.023.022A4 4 0 0020 17v-2h2v2a6.996 6.996 0 01-1.65 4.486l-.023-.022-1.414-1.414 1.414-1.414.023.022A4 4 0 0022 17v-2z"
                                        ></path>
                                    </svg>
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-white font-bold">
                        Don't have an account yet?{" "}
                        <a href="#" className="font-bold leading-6 text-[#1976D2]">
                            <Link to="/"> Create One.</Link>
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
