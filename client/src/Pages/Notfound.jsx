/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
export default function Notfound() {
    return (
        <>
            <main className="grid min-h-screen place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8 tex-white">
                <div className="text-center">
                    <p className="text-3xl font-semibold text-[#1976D2]">You should NOT be here!</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-3  xl">Page not found</h1>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            className="rounded-md bg-[#1976D2] px-3.5 py-2.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <Link to="/home">Go back home</Link>
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}
