import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from 'react-icons/fa';
import { BiCommentMinus } from "react-icons/bi";
import axios from 'axios';
import { format } from "timeago.js";
import SyncLoader from "react-spinners/SyncLoader";
import { TfiFaceSad } from "react-icons/tfi";

const MyPost = ({ username }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/post/all');
                const filteredPosts = response.data.filter(post => post.posterUsername === username);
                setPosts(filteredPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [username]);

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
                posts.length === 0 ? (
                    <div className="text-white flex flex-col align-center items-center justify-center">
                        <TfiFaceSad className='flex justify-center align-center items-center mt-1 mb-2 text-5xl font-bold'/>
                        <div className='text-white text-xl font-bold'>{username} has made no posts yet</div>
                        </div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                            <div className="flex items-center mb-2 cursor-pointer">
                                <div className="rounded-full h-8 w-8 bg-white mr-2 overflow-hidden">
                                    <a href='/profile'><img src={`https://robohash.org/${post.posterUsername}`} alt="User Avatar" /></a>
                                </div>
                                <a href='/profile'><span className="text-blue-500  text-xl font-bold md:text-lg">{post.posterUsername}</span></a>
                                <span className="text-gray-500 mx-1">•</span>
                                <span className="text-gray-500 text-lg font-bold">{format(post.postedOn)}</span>
                            </div>
                            <div className="text-white text-2xl mb-2 font-bold" onClick={handlePost}>{post.title}</div>
                            <div className="text-white mb-2 text-xl" onClick={handlePost}>{post.content}</div>
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
                )
            )}
        </div>
    );
};

export default MyPost;
