import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown} from 'react-icons/fa';
import { BiCommentMinus } from "react-icons/bi";

const TopPost = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([
        { id: 1, user: "ayush", title: "My thoughts on iPhone 15 Pro", text: "Commentary: Remarkable CPU and battery test scores... ", likes: 500, comments: 25 },
        { id: 2, user: "emma", title: "M3 Pro Macbook Pro", text: "Laptop upgrade adds M3 chips, more power, longer battery life...", likes: 100, comments: 30 },

    ]);
    const handlePost = () => {
        navigate("/posts");
    };

    return (
        <div className="mt-4 cursor-pointer" onClick={handlePost}>
            {posts.map((post) => (
                <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                    <div className="flex items-center mb-2 cursor-pointer">
                        <div className="rounded-full h-8 w-8 bg-white mr-2">
                        <a href='/profile'><img src={`https://robohash.org/${post.user}`}  alt="User Avatar" /></a>
                        </div>
                        <a href='/profile'><span className="text-blue-500  text-xl font-bold md:text-lg">{post.user}</span></a>
                        <span className="text-gray-500 mx-1">•</span>
                        <span className="text-gray-500 text-lg font-bold"> 7 days ago</span>
                        
                    </div>
                    <div className="text-white mb-2 font-bold text-2xl">{post.title}</div>
                    <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                        <button className="flex items-center text-[#1976D2]">
                            <FaRegArrowAltCircleUp className="mr-2.5 text-white" /> {post.likes}
                        </button>
                        <button className=" text-[#1976D2]">
                            <FaRegArrowAltCircleDown className="ml-2.5" />
                        </button>
                        <button className="flex ml-10 items-center text-[#1976D2]">
                            <BiCommentMinus  className="mr-2 mt-1" /> {post.comments}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TopPost;
