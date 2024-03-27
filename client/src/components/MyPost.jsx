import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from 'react-icons/fa';
import { BiCommentMinus } from "react-icons/bi";
import axios from 'axios';
import { format } from "timeago.js";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const MyPost = ({ username, sortingOption }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/post/all');
                const filteredPosts = response.data.filter(post => post.posterUsername === username);

                let sortedPosts = [...filteredPosts];

                if (sortingOption === 'likes') {
                    sortedPosts.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
                } else if (sortingOption === 'comments') {
                    sortedPosts.sort((a, b) => b.totalComments - a.totalComments);
                } else if (sortingOption === 'oldest') {
                    sortedPosts.sort((a, b) => new Date(a.postedOn) - new Date(b.postedOn));
                } else if (sortingOption === 'latest') {
                    sortedPosts.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
                }

                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
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
    const handleEdit = (postId, title, content) => {
        localStorage.setItem('editPostId', postId);
        localStorage.setItem('editPostTitle', title)
        localStorage.setItem('editContent', content);
        navigate('/editPost')
    };
    const submit = (postId, posterUserId) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you would like to delete this post? This action cannot be undone.',
            buttons: [
                {
                    label: 'No',
                    className: "buttonNo",
                    onClick: () =>{
                    console.log("Clicked No")
                    }
                },
                {
                    label: 'Yes',
                    className: "buttonYes",
                    onClick: () =>{
                        const deletePost = async()=>{
                            try{
                                
                                console.log(postId)
                                console.log(posterUserId)
                                await axios.post(
                                    `http://localhost:5000/post/delete`,
                                    { postId: postId, posterUserId: posterUserId },
                                    { withCredentials: true }
                                );
                            }
                            catch(error){
                                console.error("Error Deleting Post:", error)
                            }
                        }
                        deletePost();
                    }
                }
            ]
        });
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
                        <div className='text-white text-xl font-bold'>{username} has made no posts yet</div>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                            <div className="flex items-center mb-2 cursor-pointer">
                                <div className="rounded-full h-8 w-8 bg-white mr-2 overflow-hidden">
                                    <Link to={`/user/${post.posterUsername}`}>
                                        <a href='/profile'><img src={`https://robohash.org/${post.posterUsername}`} alt="User Avatar" /></a>
                                    </Link>
                                </div>
                                <a href='/profile'><Link to={`/user/${post.posterUsername}`}><span className="text-[#1976D2] hover:text-[#1976d2e2] hover:underline  text-xl font-bold md:text-lg">{post.posterUsername}</span></Link></a>
                                <span className="text-gray-500 mx-1">•</span>
                                <span className="text-gray-500 text-lg font-bold">{format(post.postedOn)}</span>
                                {post.isEdited && (
                                    <span className="text-gray-500  text-lg font-bold ml-2">[edited]</span>
                                )}
                                {post.posterUsername === username && (
                                <>
                                    <FiEdit className='text-white text-2xl ml-5 mt-1 md:text-lg hover:text-gray-500' onClick={() => handleEdit(post._id, post.title, post.content)}/>
                                    <MdDeleteOutline className='text-red-500 items-center text-3xl ml-3 mt-1 md:text-xl hover:text-gray-500' onClick={() => submit(post._id, post.posterUserId)}/>
                                </>
                            )}
                            </div>
                            <Link to={{ pathname: `/posts/${post._id}` }} className="text-white text-2xl mb-2 font-bold">
                                <ReactMarkdown>{post.title}</ReactMarkdown>
                            </Link>
                            <Link to={{ pathname: `/posts/${post._id}` }} className="text-white mb-2 text-xl">
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                            </Link>
                            <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                                <button className="flex items-center text-[#1976D2] hover:text-[#1976d2e2]">
                                    <FaRegArrowAltCircleUp className="mr-2.5" />
                                </button>
                                <a>{formatScore(post.upvotes - post.downvotes)}</a>
                                <button className=" text-[#1976D2] hover:text-[#1976d2e2]">
                                    <FaRegArrowAltCircleDown className="ml-2.5" />
                                </button>
                                <Link to={{ pathname: `/posts/${post._id}` }}>
                                    <button className="flex ml-10 items-center text-[#1976D2] hover:text-[#1976d2e2]">
                                        <BiCommentMinus className="mr-2 mt-1" /> {post.totalComments}
                                    </button>
                                </Link> 
                            </div>
                        </div>
                    ))
                )
            )}
        </div>
    );
};

export default MyPost;
