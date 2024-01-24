/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
export default function Signin() {
    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black text-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={Logo}
                        alt="Convoz"
                    />
                    <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white">
                        Log In
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email*
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder='example@gmail.com'
                                    required
                                    className="block w-full rounded-md border-0 py-2.5 px-2.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1976D2] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
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
                                    className="block w-full rounded-md border-0 py-2.5 px-2.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1976D2] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#1976D2] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-white">
                        Don't have an account yet?{' '}
                        <a href="#" className="font-semibold leading-6 text-[#1976D2]">
                            <Link to='/signup'>Create One.</Link>
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
