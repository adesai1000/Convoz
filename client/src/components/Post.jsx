/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';

const Post = () => {
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([
        { id: 1, user: "ayush", title: "My thoughts on iPhone 15 Pro", text: "Commentary: Remarkable CPU and battery test scores show the power of the iPhone 15 Pro and Pro Max. Plus, get the whole scoop on overheating. ", likes: 500, comments: 25 },
        { id: 2, user: "emma", title: "M3 Pro Macbook Pro", text: "Laptop upgrade adds M3 chips, more power, longer battery life, brighter screen, lower price and darker colour.", likes: 100, comments: 30 },
        { id: 3, user: "jack", title: "Apple watch banned in US?", text: "The Apple Watch Series 9 and Watch Ultra 2 were both banned in the US late last year as the result of a patent dispute with medical device maker Masimo.", likes: 10, comments: 5 },
    ]);
    const dummyUsers = ["User1", "User2", "User3", "User4"];

    const handlePostSubmit = async () => {
        setPostText("");
    };

    const handleLike = (postId) => {
        // Placeholder for like functionality
    };

    const handleComment = (postId) => {
        // Placeholder for comment functionality
    };

    const handleCheckAllLikes = () => {
        const allLikes = posts.reduce((totalLikes, post) => totalLikes + post.likes, 0);
        alert(`Total Likes: ${allLikes}`);
    };

    return (
        <div className="mt-4 cursor-pointer ">
            {posts.map((post) => (
                <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                    <div className="flex items-center mb-2 cursor-pointer">
                        <div className="rounded-full h-8 w-8 bg-white mr-2">
                            <img src="https://robohash.org/ayush" alt="User Avatar" />
                        </div>
                        <span className="text-blue-500 font-semibold">{post.user}</span>
                        <span className="text-gray-500 mx-1">•</span>
                        <span className="text-gray-500"> 7 days ago (edited)</span>
                    </div>
                    <div className="text-white mb-2 font-bold">{post.title}</div>
                    <div className="text-white mb-2">{post.text}</div>
                    <div className="flex gap-4 items-center text-white mb-2">
                        <button onClick={() => handleLike(post.id)} className="flex items-center text-[#1976D2]">
                            <FaThumbsUp className="mr-1" /> {post.likes}
                        </button>
                        <button onClick={() => handleComment(post.id)} className="flex items-center text-[#1976D2]">
                            <FaComment className="mr-1" /> {post.comments}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Post;
