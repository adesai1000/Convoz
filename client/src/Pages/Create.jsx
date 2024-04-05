import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import profaneWords from 'profane-words';

const Create = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [id, setId] = useState();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleBack = () => {
        history.go(-1);
    };

    const handleSubmit = async () => {
        try {
            const posterUserId = id;
            const posterUsername = username;
            const filteredTitle = filterProfanity(title);
            const filteredContent = filterProfanity(content);

            const response = await axios.post(
                "http://localhost:5000/post/",
                { title: filteredTitle, content: filteredContent, posterUserId, posterUsername },
                { withCredentials: true }
            );
            const { _id } = response.data;
            navigate(`/posts/${_id}`);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const filterProfanity = (text) => {
        const profaneRegex = new RegExp(`\\b(?:${profaneWords.join("|")})\\b`, "gi");
        return text.replace(profaneRegex, (match) => "𝘟".repeat(match.length));
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
            setId(user._id);
            return status
                ? console.log("Logged in")
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    return (
        <div>
            <Navbar username={username} />
            <div className="min-h-screen bg-black flex flex-col justify-start sm:flex-row items-start sm:justify-center border-slate-600 mt-5">
                <div className="w-full item-start md:w-1/2 p-3">
                    <div className="border-2 border-slate-600 p-4 rounded md:flex-row items-center justify-between   text-white">
                        <button className="bg-[#1976D2] hover:bg-[#1976d2e2] text-white p-3 rounded md:mt-0 " onClick={handleBack}><IoArrowBack /></button>
                        <div className="flex">
                            <img className=" rounded-full bg-[#E8E8E8] h-20 w-20 mt-3 md:w-auto md:h-10"
                                src={`https://robohash.org/${username}`}
                                alt={username}
                            />
                            <div>
                                <p className="flex ml-5 mt-2 md:mt-3 text-white text-2xl md:text-xl font-bold justify-center items-center">
                                    What would you like to post today, {username}?
                                </p>
                                <p className="ml-5 text-[#1976D2] hover:text-[#1976d2e2] cursor-pointer underline text-lg md:none font-bold">
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
                                rows="6"
                                className="bg-black w-full p-2 mb-4 rounded border-2 border-slate-600 focus:outline-none text-xl"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                            <div className="flex">
                                <button
                                    className="bg-[#1976D2] hover:bg-[#1976d2e2] text-white p-2 rounded font-bold"
                                    onClick={handleSubmit}
                                >
                                    Post
                                </button>
                                <MdOutlineLocationOn className="text-5xl ml-3  justify-center text-[#1976D2] hover:text-[#1976d2e2] hover:cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
