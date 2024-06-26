import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProfRight from "../components/ProfRight";
import MyPost from "../components/MyPost";
import MyComment from "../components/MyComment"

const Profile = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [activeTab, setActiveTab] = useState("Posts");
    const [sortingOption, setSortingOption] = useState("latest");
    const [userId, setUserId] = useState("")
    const [verified, setVerified] = useState(false)

    const handlePost = () => {
        navigate('/create');
    }

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                // navigate("/login");
            }
            const { data } = await axios.post(
                "https://convoz.onrender.com/",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user.username);
            setUserId(user._id);
            if (user.isVip === true) {
                setVerified(true);
            }
            return status
                ? console.log("Logged in")
                : console.log("Not Logged in") //(removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
    const currentUserId = localStorage.getItem("currentUser");
    return (
        <>
            <Navbar username={username} />
            <div className="min-h-screen bg-black flex flex-col md:flex-row items-start justify-center border-slate-600">
                <ProfRight username={username} verified={verified} />
                <div className="w-full md:w-1/2 p-4">
                    <div className="border-2 border-slate-600 p-4 mb-4 rounded flex flex-row md:flex-row items-center justify-between text-white">
                        <div className="flex items-center space-x-4 text-xl font-bold">
                            <button className={`tab-btn ${activeTab === "Posts" ? "active text-[#1976D2] underline" : ""}`} onClick={() => setActiveTab("Posts")}>Posts</button>

                            <button className={`tab-btn ${activeTab === "Comments" ? "active text-[#1976D2] underline" : ""}`} onClick={() => setActiveTab("Comments")}>Comments</button>
                        </div>
                    </div>

                    <div className="border-2 border-slate-600 p-4 rounded flex flex-row md:flex-row items-center justify-between text-white">
                        <button className="bg-[#1976D2] hover:bg-[#1976d2e2] text-white p-2 rounded md:mt-0 text-xl font-bold" onClick={handlePost}>+ New Post</button>
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
                    {activeTab === "Posts" && <MyPost username={username} sortingOption={sortingOption} />}
                    {activeTab === "Comments" && <MyComment username={username} sortingOption={sortingOption} />}
                </div>
            </div>
        </>
    );
};
export default Profile;
