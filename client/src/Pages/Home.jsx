import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([
        { id: 1, title: "Dummy Title", text: "Dummy post text.", likes: 5, comments: 2 },
        { id: 2, title: "Another Title", text: "Another dummy post text.", likes: 10, comments: 3 },
    ]);
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

    const handlePostSubmit = async () => {
        // Add logic to post the text to the server and update the posts state
        // Example:
        // const response = await axios.post("http://localhost:3000/posts", { text: postText });
        // setPosts([...posts, response.data]);
        setPostText(""); // Clear the text box after posting
    };

    const handleLike = (postId) => {
        // Add logic to handle liking a post
        // Example:
        // setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
    };

    const handleComment = (postId) => {
        // Add logic to handle commenting on a post
        // Example:
        // const newComment = prompt("Enter your comment:");
        // setPosts(posts.map(post => post.id === postId ? { ...post, comments: post.comments + 1 } : post));
    };

    return (
        <>
            <Navbar username={username} />
            <div className="min-h-screen bg-black flex flex-col md:flex-row items-start justify-center border-t s border-slate-600">
                <div className="w-full md:w-1/4 p-4">
                    {/* Left part empty */}
                </div>
                <div className="w-full md:w-1/2 p-4 ">
                    <h1 className="text-white mb-4 text-2xl font-bold">
                        Welcome {username}
                    </h1>
                    <form className="border-2 border-slate-600 p-2 rounded flex items-center text-white focus:border-[#1976D2]">
                        <input
                            type="text"
                            placeholder="Write your post..."
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                            className="bg-transparent focus:outline-none w-full"
                        />
                    </form>
                    <button
                        className="bg-blue-500 text-white p-2 rounded mt-2"
                        onClick={handlePostSubmit}
                    >
                        Post
                    </button>
                    <div className="mt-4">
                        {/* Dummy posts */}
                        {posts.map((post) => (
                            <div key={post.id} className="border border-slate-600 p-4 mb-4">
                                <div className="text-white mb-2 font-bold">{post.title}</div>
                                <div className="text-white mb-2">{post.text}</div>
                                <div className="flex justify-between text-white">
                                    <button onClick={() => handleLike(post.id)} className="text-blue-500">Like ({post.likes})</button>
                                    <button onClick={() => handleComment(post.id)} className="text-blue-500">Comment ({post.comments})</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-1/4 p-4 border-l border-slate-600">
                    <div className="mb-4 border border-slate-600 p-4 rounded">
                        <div className="text-white mb-2 font-bold">Don't forget to star this project on GitHub!</div>
                    </div>
                    <div className="mb-4 border border-slate-600 p-4 rounded">
                        <div className="text-white mb-2 font-bold">Find Others:</div>
                        {dummyUsers.map((user) => (
                            <div key={user} className="text-white mb-2">
                                {user}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
