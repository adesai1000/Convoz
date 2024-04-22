import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiCommentMinus } from "react-icons/bi";
import axios from 'axios';
import { format } from "timeago.js";
import ReactMarkdown from 'react-markdown';
import RiseLoader from "react-spinners/RiseLoader";
import { LuMedal } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";

const TopPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://convoz.onrender.com/post/all');
                const sortedPosts = response.data.sort((a, b) => b.upvotes - a.upvotes);
                const topThreePosts = sortedPosts.slice(0, 3);
                setPosts(topThreePosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

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
                    <RiseLoader color={"#1976D2"} loading={true} size={10} />
                </div>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                        <div className="flex items-center mb-2 cursor-pointer">
                            <div className="overflow-hidden rounded-full h-8 w-8 bg-white mr-2">
                                <Link to={`/user/${post.posterUsername}`}><img src={`https://robohash.org/${post.posterUsername}`} alt="User Avatar" /></Link>
                            </div>
                            <a><Link to={`/user/${post.posterUsername}`}><span className="text-[#1976D2] hover:text-[#1976d2e2] hover:underline text-xl font-bold md:text-lg">{post.posterUsername}</span></Link></a>
                            {post.isVip && (
                                <MdOutlineVerified className="ml-2 text-xl text-yellow-500" />
                            )}
                            <span className="text-gray-500 mx-1">•</span>
                            <span className="text-gray-500 text-lg font-bold">{format(post.postedOn)}</span>
                        </div>
                        <Link to={{ pathname: `/posts/${post._id}` }} className="text-white text-2xl mb-2 font-bold">
                            <ReactMarkdown>{post.title}</ReactMarkdown>
                        </Link>
                        <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                            <button className="flex items-center text-[#1976D2] hover:text-[#1976d2e2]">
                                <LuMedal className="mr-2.5 text-2xl " />
                            </button>
                            <a>{formatScore(post.upvotes)}</a>
                            <Link to={{ pathname: `/posts/${post._id}` }}>
                                <button className="flex ml-5 mt-1 items-center text-[#1976D2] hover:text-[#1976d2e2]">
                                    <BiCommentMinus className="mr-2 mt-0.5" /> {post.totalComments}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TopPost;
