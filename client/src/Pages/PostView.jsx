/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import RightSide from "../components/RightSide";
import IndiPost from "../components/IndiPost";
import Comment from "../components/Comment";
const PostView = () => {
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
                "http://localhost:5000",
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
                <div className="w-full md:w-1/2 ">
                    <IndiPost />
                    <Comment />
                </div>
                <RightSide />
            </div>
        </>
    );
};
export default PostView;
