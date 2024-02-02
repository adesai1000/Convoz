/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaRegStar } from "react-icons/fa";
import { BsBorder, BsGraphUpArrow } from "react-icons/bs";
import ad from '../assets/ad.png'
import Post from "../components/Post";
import { SlReload } from "react-icons/sl";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const dummyUsers = ["User1", "User2", "User3", "User4"];
    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            const { data } = await axios.post(
                "http://localhost:3000",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);
            return status
                ? console.log("Logged in")
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);


    return (
        <>
            <Navbar username={username} />

            <div className="min-h-screen bg-black flex flex-col md:flex-row items-start justify-center border-slate-600">
                <div className="hidden md:block w-1/4 p-4 h-550px">
                    <img src={ad} />
                </div>
                {/* MIDDLE OF THE PAGE */}
                <div className="w-full md:w-1/2 p-4">
                    <div className="border-2 border-slate-600 p-4 rounded flex flex-row md:flex-row items-center justify-between text-white">
                        <button className="bg-[#1976D2] text-white p-2 rounded md:mt-0">+ New Post</button>
                        <div className="flex items-center space-x-2">
                            <p className="text-lg">Sort:</p>
                            <select className="text-white bg-black border-2 border-slate-600 rounded p-2">
                                <option value="latest">Latest</option>
                                <option value="likes">Likes</option>
                                <option value="comments">Comments</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>

                    </div>
                    <Post />
                    <Post />
                    <Post />
                </div>
                {/* RIGHT SIDE OF THE PAGE */}
                <div className="hidden md:block w-1/4 p-4">

                    <div className="mb-4 border-2 border-slate-600 p-3 rounded flex gap-4">
                        <FaRegStar className="mt-1 text-xl text-yellow-500 max-h-90%" />
                        <div className="text-lg text-white font-semibold">Don't forget to star the <a href="https://github.com/adesai1000/Convoz" target=" _blank" className="text-[#1976D2] underline font-semibold"> Repo!</a>
                        </div>
                    </div>
                    <div className="mb-4 border-2 border-slate-600 p-3 rounded flex gap-4">
                        <BsGraphUpArrow className="mt-2 text-lg text-white max-h-90%" />
                        <div className="text-lg text-white font-semibold">Top Posts</div>
                    </div>
                    <Post />
                    <div className="mb-3 border-2 border-slate-600 p-3 rounded ">
                        <div className="border-b-2 border-slate-600 flex justify-between">
                            <div className="text-lg  p-3 rounded text-white font-semibold">Find Others</div>
                            <SlReload className="mt-4 text-lg text-white max-h-90% cursor-pointer hover:text-slate-600" /></div>
                        <div className="flex justify-between">
                            <div className="relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-3">
                                <img src="https://robohash.org/ayush" />
                                <p className="ml-4 text-white justify-center">ayush</p>
                            </div>
                            <p className="text-[#1976D2] mt-3 justify-center underline">View</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-3">
                                <img src="https://robohash.org/emma" />
                                <p className="ml-4 text-white justify-center">emma</p>
                            </div>
                            <p className="text-[#1976D2] mt-3 justify-center underline">View</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-3">
                                <img src="https://robohash.org/jack" />
                                <p className="ml-4 text-white justify-center">jack</p>
                            </div>
                            <p className="text-[#1976D2] mt-3 justify-center underline">View</p>
                        </div>
                    </div>

                </div >
            </div>
        </>
    );
};
export default Home;
