import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegStar } from "react-icons/fa";
import { SlReload } from "react-icons/sl";

const ProfRight = ({ username }) => {
    const [randomUsers, setRandomUsers] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);

    useEffect(() => {
        fetchRandomUsers();
        fetchTotalPosts();
    }, []);

    const fetchRandomUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/random');
            setRandomUsers(response.data.usernames);
        } catch (error) {
            console.error('Error fetching random users:', error);
        }
    };

    const fetchTotalPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/post/all');
            const filteredPosts = response.data.filter(post => post.posterUsername === username);
            setTotalPosts(filteredPosts.length);
        } catch (error) {
            console.error('Error fetching total posts:', error);
        }
    };

    return (
        <div className="w-full px-4 pt-5 md:w-1/4 md:top-0 md:p-4 md:items-center md:justify-center">
            <div className="border-2 border-slate-600 rounded mb-4 justify-center">
                <div className="justify-center items-center text-center">
                    <img
                        src={`https://robohash.org/${username}`}
                        alt="Profile"
                        className="bg-[#E8E8E8] p-2 h-3/5 w-3/5 rounded-full mx-auto mt-5"
                    />
                    <p className="mt-2 text-white text-2xl font-bold">{username}</p>
                    <div className="mt-2 mb-2 text-white font-bold">
                        Total Posts: {totalPosts}
                    </div>
                </div>
            </div>
            <div className="md:block">
                <div className="md:mb-4 border-2 border-slate-600 p-3 rounded flex gap-4">
                    <FaRegStar className="mt-1 text-4xl md:text-2xl text-yellow-500 max-h-90%" />
                    <div className="text-2xl md:text-xl text-white font-bold">Don't forget to star the <a href="https://github.com/adesai1000/Convoz" target=" _blank" className="text-[#1976D2] underline font-semibold"> Repo!</a>
                    </div>
                </div>
                <div className="hidden mb-3 border-2 border-slate-600 p-3 rounded md:block">
                    <div className="border-b-2 border-slate-600 flex justify-between">
                        <div className="text-xl  p-2 mb-1 rounded text-white font-bold">Find Others</div>
                        <SlReload className="mt-4 text-lg text-white max-h-90% cursor-pointer hover:text-slate-600 hover:animate-spin" onClick={fetchRandomUsers}/>
                    </div>
                    {randomUsers.map((user, index) => (
                        <div key={index} className="flex justify-between">
                            <div className="relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-5">
                                <img src={`https://robohash.org/${user}`} alt={`User-${index}`} />
                                <p className="ml-4 text-white justify-center text-xl font-bold">{user}</p>
                            </div>
                            <p className="text-[#1976D2] mt-3 justify-center underline text-xl font-bold">View</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfRight;
