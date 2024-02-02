/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const Post = () => {
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([
        { id: 1, title: "Dummy Title", text: "Dummy post text.", likes: 5, comments: 2 },
        { id: 2, title: "Another Title", text: "Another dummy post text.", likes: 10, comments: 3 },
    ]);
    const dummyUsers = ["User1", "User2", "User3", "User4"];

    const handlePostSubmit = async () => {
        setPostText("");
    };

    const handleLike = (postId) => {
    };

    const handleComment = (postId) => {
    };
    return (
        <div className="mt-4">
            {/* Dummy posts */}
            {posts.map((post) => (
                <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4">
                    <div className="text-white mb-2 font-bold">{post.title}</div>
                    <div className="text-white mb-2">{post.text}</div>
                    <div className="flex justify-between text-white">
                        <button onClick={() => handleLike(post.id)} className="text-[#1976D2]">Like ({post.likes})</button>
                        <button onClick={() => handleComment(post.id)} className="text-[#1976D2]">Comment ({post.comments})</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Post