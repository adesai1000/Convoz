import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopPost from './TopPost';
import { FaRegStar } from "react-icons/fa";
import { LuMedal } from "react-icons/lu";
import { SlReload } from "react-icons/sl";
import { MdOutlineVerified } from "react-icons/md";
import RiseLoader from "react-spinners/RiseLoader";
import { Link } from 'react-router-dom';

const RightSide = () => {
    const [randomUsers, setRandomUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRandomUsers();
    }, []);

    const fetchRandomUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://convoz.onrender.com/random');
            setRandomUsers(response.data);
        } catch (error) {
            console.error('Error fetching random users:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hidden md:block w-1/4 p-4">
            <div className="mb-4 border-2 border-slate-600 p-3 rounded flex gap-4">
                <FaRegStar className="mt-1 text-xl text-yellow-500 max-h-90%" />
                <div className="text-xl text-white font-bold">Don't forget to star the <a href="https://github.com/adesai1000/Convoz" target="_blank" rel="noopener noreferrer" className="text-[#1976D2] underline hover:text-[#1976d2e2] font-semibold">Repo!</a>
                </div>
            </div>
            <div className="mb-4 border-2 border-slate-600 p-3 rounded flex gap-4">
                <LuMedal className="text-3xl text-white max-h-90%" />
                <div className="text-xl text-white font-bold">Top Posts</div>
            </div>
            <TopPost />
            <div className="mb-3 border-2 border-slate-600 p-3 rounded ">
                <div className="border-b-2 border-slate-600 flex justify-between">
                    <div className="text-xl  p-2 mb-1 rounded text-white font-bold ">Find Others</div>
                    <SlReload className="mt-4 text-lg text-white max-h-90% cursor-pointer hover:text-slate-600 hover:animate-spin" onClick={fetchRandomUsers} />
                </div>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <RiseLoader color={"#1976D2"} loading={true} size={10} />
                    </div>
                ) : (
                    randomUsers.map((user, index) => (
                        <div key={index} className="flex justify-between">
                            <div className=" relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-5">
                                <img src={`https://robohash.org/${user.username}`} alt={`user-${index}`} />
                                <p className="ml-4 text-white justify-center text-xl font-bold">{user.username}</p>
                                <span>{user.isVip && <MdOutlineVerified className="text-yellow-500 ml-3 mt-1 text-xl" />}</span>

                            </div>
                            <Link to={`/user/${user.username}`}>
                                <p className="text-[#1976D2] hover:text-[#1976d2e2] hover:underline mt-5 justify-center cursor-pointer text-xl font-bold">View</p>
                            </Link>
                        </div>
                    ))

                )}
            </div>
        </div>
    );
};

export default RightSide;
