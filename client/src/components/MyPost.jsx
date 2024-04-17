import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiCommentMinus } from "react-icons/bi";
import axios from 'axios';
import { format } from "timeago.js";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdOutlineVerified } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";

const MyPost = ({ username, sortingOption }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/post/all');
                const filteredPosts = response.data.filter(post => post.posterUsername === username);

                let sortedPosts = [...filteredPosts];

                if (sortingOption === 'likes') {
                    sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
                } else if (sortingOption === 'comments') {
                    sortedPosts.sort((a, b) => b.totalComments - a.totalComments);
                } else if (sortingOption === 'oldest') {
                    sortedPosts.sort((a, b) => new Date(a.postedOn) - new Date(b.postedOn));
                } else if (sortingOption === 'latest') {
                    sortedPosts.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
                }

                setPosts(sortedPosts);
                setFetchError(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setFetchError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [username, sortingOption]);
   
    const formatScore = (score) => {
        if (score >= 1000000) {
            return (score / 1000000).toFixed(1) + 'M';
        } else if (score >= 1000) {
            return (score / 1000).toFixed(1) + 'k';
        } else {
            return score;
        }
    };

    const truncateContent = (content) => {
        const words = content.split(' ');
        if (words.length > 25) {
            return words.slice(0, 25).join(' ') + '...';
        }
        return content;
    };
    
    return (
        <div className="mt-4 cursor-pointer">
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <SyncLoader color={"#1976D2"} loading={true} size={10} />
                </div>
            ) : fetchError ? (
                <div className="text-white flex flex-col align-center items-center justify-center">
                    <div className='text-white text-xl font-bold'>Failed to fetch posts. Please try again later.</div>
                </div>
            ) : (
                posts.length === 0 && (
                    <div className="text-white flex flex-col align-center items-center justify-center">
                        <div className='text-white text-xl font-bold'>{username} has made no posts yet</div>
                    </div>
                )
            )}
            {posts.length > 0 && (
                posts.map((post) => (
                    <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                        <div className="flex items-center mb-2 cursor-pointer">
                            <div className="rounded-full h-8 w-8 bg-white mr-2 overflow-hidden">
                                <Link to={`/user/${post.posterUsername}`}>
                                    <a href='/profile'><img src={`https://robohash.org/${post.posterUsername}`} alt="User Avatar" /></a>
                                </Link>
                            </div>
                            <a href='/profile'><Link to={`/user/${post.posterUsername}`}><span className="text-[#1976D2] hover:text-[#1976d2e2] hover:underline  text-xl font-bold md:text-lg">{post.posterUsername}</span></Link></a>

            {post.isVip &&(
               <MdOutlineVerified className="ml-2 text-xl text-yellow-500"/>
            )}
                            <span className="text-gray-500 mx-1">•</span>
                            <span className="text-gray-500 text-lg font-bold">{format(post.postedOn)}</span>
                            {post.isEdited && (
                                <span className="text-gray-500  text-lg font-bold ml-2">
                            <TbEditCircle />
                                </span>
                            )}
                        </div>
                        <Link to={{ pathname: `/posts/${post._id}` }} className="text-white text-2xl mb-2 font-bold">
                            <ReactMarkdown>{post.title}</ReactMarkdown>
                        </Link>
                        <Link to={{ pathname: `/posts/${post._id}` }} className="text-white mb-2 text-xl">
                            <ReactMarkdown>{truncateContent(post.content)}</ReactMarkdown>
                        </Link>
                        <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                            <a>{formatScore(post.upvotes)}</a>
                            <Link to={{ pathname: `/posts/${post._id}` }}>
                                <button className="flex ml-5 items-center text-[#1976D2] hover:text-[#1976d2e2]">
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

export default MyPost;
