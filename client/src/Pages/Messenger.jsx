/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";

const Messenger = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [activeTab, setActiveTab] = useState("Posts");
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
            <div className="min-h-screen bg-black text-white border-slate-600">Messenger</div>
        </>
    );
};
export default Messenger;
