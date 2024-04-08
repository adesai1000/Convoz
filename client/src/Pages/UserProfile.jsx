import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import ProfRight from "../components/ProfRight";
import MyPost from "../components/MyPost";
import UserComment from "../components/userComment";

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [receiverId, setReceiverId] = useState(null);
    const [senderId, setSenderId] = useState(null);
    const [activeTab, setActiveTab] = useState("Posts");
    const [sortingOption, setSortingOption] = useState("latest");

    const createChat = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/chat/",
                {
                    senderId: senderId,
                    receiverId: receiverId,
                    sender: username,
                    receiver: id
                },
                { withCredentials: true }
            );
            navigate('/messenger');
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!cookies.token) {
                    navigate("/login");
                    return;
                }
                const userData = await axios.post(
                    "http://localhost:5000",
                    {},
                    { withCredentials: true }
                );
                setUsername(userData.data.user.username);
                setSenderId(userData.data.user._id);
                if (id === userData.data.user.username) {
                    navigate("/profile");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                removeCookie("token");
                navigate("/login");
            }
        };

        fetchData();
    }, [cookies.token, id, navigate, removeCookie]);

    useEffect(() => {
        const fetchReceiverId = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:5000/chat/findrid",
                    { receiverUsername: id },
                    { withCredentials: true }
                );

                setReceiverId(response.data.userId);
            } catch (error) {
                console.error("Error fetching receiver ID:", error);
            }
        };

        fetchReceiverId();
    }, [id]);

    return (
        <>
            <Navbar username={username} />
            <div className="min-h-screen bg-black flex flex-col md:flex-row items-start justify-center border-slate-600">
                <ProfRight username={id}/>
                <div className="w-full md:w-1/2 p-4">
                    <div className="border-2 border-slate-600 p-4 mb-4 rounded flex flex-row md:flex-row items-center justify-between text-white">
                        <div className="flex items-center space-x-4 text-xl font-bold">
                            <button className={`tab-btn ${activeTab === "Posts" ? "active text-[#1976D2] underline" : ""}`} onClick={() => setActiveTab("Posts")}>Posts</button>
                            <button className={`tab-btn ${activeTab === "Comments" ? "active text-[#1976D2] underline" : ""}`} onClick={() => setActiveTab("Comments")}>Comments</button>
                        </div>
                    </div>

                    <div className="border-2 border-slate-600 p-4 rounded flex flex-row md:flex-row items-center justify-between text-white">
                        <button className="bg-[#1976D2] hover:bg-[#1976d2e2] text-white p-2 rounded md:mt-0 text-xl font-bold" onClick={createChat}>Message</button>
                        <div className="flex items-center space-x-2">
                            <p className="text-xl font-bold">Sort:</p>
                            <select className="text-white bg-black border-2 text-xl font-bold border-slate-600 rounded p-2" onChange={(e) => setSortingOption(e.target.value)}>
                                <option value="latest">Latest</option>
                                <option value="likes">Likes</option>
                                <option value="comments">Comments</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>
                    </div>
                    {activeTab === "Posts" && <MyPost username={id} sortingOption={sortingOption} />}
                    {activeTab === "Comments" && <UserComment username={id} sortingOption={sortingOption}/>}
                </div>
            </div>
        </>
    );
};

export default UserProfile;
