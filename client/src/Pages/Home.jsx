/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import RightSide from "../components/RightSide";

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
                </div>
                <RightSide />
            </div>
        </>
    );
};
export default Home;
