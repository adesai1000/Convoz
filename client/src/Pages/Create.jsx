import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import { IoArrowBack } from "react-icons/io5";
import { markdown } from "markdown";

const Create = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [id, setId] = useState()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleBack = () => {
        history.go(-1)
    }

    const handleSubmit = async () => {
        try {
            const posterUserId = id;
            const posterUsername = username;

            // Make POST request to create post
            await axios.post(
                "http://localhost:5000/post/", // Adjust the URL based on your backend route
                { title, content, posterUserId, posterUsername },
                { withCredentials: true }
            );
            // Redirect user to posts page after successful submission
            history.go(-1)
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            const { data } = await axios.post(
                "http://localhost:5000",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user.username);
            setId(user._id)
            return status
                ? console.log("Logged in")
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    return (
        <div>
            <Navbar username={username} />
            <div className="min-h-screen bg-black flex flex-col justify-start sm:flex-row items-start sm:justify-center border-slate-600">
                <div className="w-full item-start md:w-1/2 p-4">
                    <div className="border-2 border-slate-600 p-4 rounded md:flex-row items-center justify-between   text-white">
                        <button className="bg-[#1976D2] text-white p-3 rounded md:mt-0 " onClick={handleBack}><IoArrowBack /></button>
                        <div className="flex">
                            <img className="rounded-full bg-[#E8E8E8] h-10 w-auto mt-3"
                                src={`https://robohash.org/${username}`}
                                alt={username}
                            />
                            <div>
                                <p className="flex ml-5 mt-2 md:mt-3 text-white text-2xl md:text-xl font-bold justify-center items-center">
                                    What would you like to post today, {username}?
                                </p>
                                <p className="ml-5 text-[#1976D2] cursor-pointer underline text-lg md:none font-bold">
                                    <a href="https://commonmark.org/help/" target="_blank">Markdown Help</a>
                                </p>
                            </div>
                        </div>
                        <div className="data w-full mt-5">
                            <textarea
                                placeholder="Title*"
                                rows="1"
                                className="bg-black w-full p-4 mb-4 rounded border-2 border-slate-600 focus:outline-none text-xl resize-none"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></textarea>
                            <textarea
                                placeholder="Content*"
                                rows="10"
                                className="bg-black w-full p-2 mb-4 rounded border-2 border-slate-600 focus:outline-none text-xl"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                            <button
                                className="bg-[#1976D2] text-white p-2 rounded font-bold"
                                onClick={handleSubmit}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
