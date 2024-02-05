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

const Create = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const handlePost = () => {
        navigate('/create');
    }
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
                <div className="w-full md:w-1/2 p-4">
                    <div className="border-2 border-slate-600 p-4 rounded md:flex-row items-center justify-between text-white">
                        <button className="bg-[#1976D2] text-white p-2 rounded md:mt-0" onClick={handlePost}>Back</button>
                        <img className=""
                            src={`https://robohash.org/${username}`}
                            alt={username}
                        />
                    </div>
                </div>
                <RightSide />
            </div>
        </>
    );
};
export default Create;
