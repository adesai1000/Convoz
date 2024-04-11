import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import { MdOutlineVerified } from "react-icons/md";

const Vip = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!cookies.token) {
                    navigate("/login");
                    return;
                }
                const response = await axios.post(
                    "http://localhost:5000",
                    {},
                    { withCredentials: true }
                );
                const { status, user } = response.data;
                if (status) {
                    setUsername(user.username);
                    localStorage.setItem("currentUser", user._id)
                } else {
                    removeCookie("token");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [cookies, navigate, removeCookie]);

    return (
        <>
            <Navbar username={username} />
            <div className="min-h-screen bg-black flex justify-center items-center">
                <div className="bg-white h-auto w-96 rounded-lg shadow-lg p-2">
                <h1 className="text-4xl font-bold font-poppins">Become a VIP</h1>
                <p>Verify yourself</p> <MdOutlineVerified />
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                <p>Asd</p>
                </div>
            </div>
        </>
    );
};
export default Vip;
