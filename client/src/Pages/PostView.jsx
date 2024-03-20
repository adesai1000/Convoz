import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import RightSide from "../components/RightSide";
import IndiPost from "../components/IndiPost";
import Comment from "../components/Comment";
import CommentView from "../components/CommentView";
const PostView = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

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
            return status
                ? console.log("Logged in")
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    return (
        <>
            <Navbar username={username} />
            <div className=" bg-black flex flex-col md:flex-row items-start justify-center border-slate-600">
                <div className="w-full md:w-1/2 ">
                    <IndiPost />
                    <Comment />
                    <CommentView />
                </div>
                <RightSide />
            </div>
        </>
    );
};
export default PostView;
