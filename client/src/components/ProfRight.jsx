/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { SlReload } from "react-icons/sl";
import { RiEditLine } from "react-icons/ri";

const ProfRight = () => {
    const user = {
        profilePicture: "https://robohash.org/ayush",
        username: "ayush",
        bio: "This is the user's bio.",
        totalLikes: 42,
        totalPosts: 10, 
    };

    const [isEditingBio, setIsEditingBio] = useState(false);
    const [editedBio, setEditedBio] = useState(user.bio);

    const handleEditBio = () => {
        setIsEditingBio(false);
    };

    return (
        <div className="w-full px-4 pt-5 md:w-1/4 md:top-0 md:p-4 md:items-center md:justify-center">
            <div className="border-2 border-slate-600 rounded mb-4 justify-center">
                <div className="justify-center items-center text-center">
                    <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="bg-[#E8E8E8] p-2 h-3/5 w-3/5 rounded-full mx-auto mt-5"
                    />
                    <p className="mt-2 text-white text-2xl">{user.username}</p>
                    {isEditingBio ? (
                        <div className="flex flex-col items-center mt-2">
                            <textarea
                                value={editedBio}
                                onChange={(e) => setEditedBio(e.target.value)}
                                className="bg-black text-white border-2 border-slate-600 p-2 rounded resize-none"
                            />
                            <button
                                onClick={handleEditBio}
                                className="mt-2 bg-[#1976D2] text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Save Bio
                            </button>
                        </div>
                    ) : (
                        <div className="mt-2 text-white text-lg">{user.bio}</div>
                    )}
                    {!isEditingBio && (
                        <div className="mt-2 text-white flex justify-center items-center">
                            <button
                                onClick={() => setIsEditingBio(true)}
                                className="font-semibold cursor-pointer flex items-center text-[#1976D2]"
                            >
                                <RiEditLine className="mr-1 mt-1 underline" /> Edit Bio
                            </button>
                        </div>
                    )}
                    <div className="mt-2 mb-2 text-white">
                        Total Likes: {user.totalLikes} | Posts: {user.totalPosts}
                    </div>
                </div>
            </div>
            <div className=" md:block">
                <div className="border-2 border-slate-600 p-4 rounded flex gap-4">
                    <FaRegStar className="mt-1 text-xl text-yellow-500 max-h-90%" />
                    <div className="text-xl text-white font-semibold">Don't forget to star the <a href="https://github.com/adesai1000/Convoz" target="_blank" rel="noopener noreferrer" className="text-[#1976D2] underline font-semibold"> Repo!</a>
                    </div>
                </div>
                <div className=" hidden mb-3 border-2 border-slate-600 p-3 rounded md:block">
                    <div className="border-b-2 border-slate-600 flex justify-between">
                        <div className="text-lg  p-2 mb-1 rounded text-white font-semibold">Find Others</div>
                        <SlReload className="mt-4 text-lg text-white max-h-90% cursor-pointer hover:text-slate-600" /></div>
                    <div className="flex justify-between">
                        <div className="relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-3">
                            <img src="https://robohash.org/ayush" alt="User" />
                            <p className="ml-4 text-white justify-center">ayush</p>
                        </div>
                        <p className="text-[#1976D2] mt-3 justify-center underline">View</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-3">
                            <img src="https://robohash.org/emma" alt="User" />
                            <p className="ml-4 text-white justify-center">emma</p>
                        </div>
                        <p className="text-[#1976D2] mt-3 justify-center underline">View</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-3">
                            <img src="https://robohash.org/jack" alt="User" />
                            <p className="ml-4 text-white justify-center">jack</p>
                        </div>
                        <p className="text-[#1976D2] mt-3 justify-center underline">View</p>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default ProfRight;