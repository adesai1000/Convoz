import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from 'react-icons/fa';
import { BiCommentMinus } from "react-icons/bi";
import axios from 'axios';
import { format } from "timeago.js";
import ReactMarkdown from 'react-markdown';
import SyncLoader from "react-spinners/SyncLoader";

const TopPost = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading spinner

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const response = await axios.get('http://localhost:5000/post/all');
                // Sort posts based on upvotes - downvotes in descending order
                const sortedPosts = response.data.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
                // Take only the top 3 posts
                const topThreePosts = sortedPosts.slice(0, 3);
                setPosts(topThreePosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchPosts();
    }, []);

    const handlePost = () => {
        navigate("/posts");
    };

    const formatScore = (score) => {
        if (score >= 1000000) {
            return (score / 1000000).toFixed(1) + 'M';
        } else if (score >= 1000) {
            return (score / 1000).toFixed(1) + 'k';
        } else {
            return score;
        }
    };

    return (
        <div className="mt-4 cursor-pointer">
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <SyncLoader color={"#1976D2"} loading={true} size={10} />
                </div>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                        <div className="flex items-center mb-2 cursor-pointer">
                            <div className="overflow-hidden rounded-full h-8 w-8 bg-white mr-2">
                                <a href='/profile'><img src={`https://robohash.org/${post.posterUsername}`} alt="User Avatar" /></a>
                            </div>
                            <a href='/profile'><span className="text-blue-500  text-xl font-bold md:text-lg">{post.posterUsername}</span></a>
                            <span className="text-gray-500 mx-1">•</span>
                            <span className="text-gray-500 text-lg font-bold">{format(post.postedOn)}</span>
                        </div>
                        <div className="text-white text-2xl mb-2 font-bold" onClick={handlePost}>
                            <ReactMarkdown>{post.title}</ReactMarkdown>
                        </div>
                        <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                            <button className="flex items-center text-[#1976D2]">
                                <FaRegArrowAltCircleUp className="mr-2.5 text-white" />
                            </button>
                            <a>{formatScore(post.upvotes - post.downvotes)}</a>
                            <button className=" text-[#1976D2]">
                                <FaRegArrowAltCircleDown className="ml-2.5" />
                            </button>
                            <button className="flex ml-10 items-center text-[#1976D2]">
                                <BiCommentMinus className="mr-2 mt-1" /> {post.totalComments}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TopPost;
