import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';
import { BiCommentMinus } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactMarkdown from 'react-markdown';
import { format } from "timeago.js";
import RiseLoader from "react-spinners/RiseLoader";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const IndiPost = ({ id, currentUser }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [upvoted, setUpvoted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/post/${id}`);
                setPost(response.data);
                checkIfUpvoted(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const checkIfUpvoted = (postData) => {
        const upvotedPostsFromStorage = JSON.parse(localStorage.getItem("upvotedPosts"));
        if (upvotedPostsFromStorage && upvotedPostsFromStorage.includes(postData._id)) {
            setUpvoted(true);
        }
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

    const handleEdit = (postId, title, content) => {
        localStorage.setItem('editPostId', postId);
        localStorage.setItem('editPostTitle', title)
        localStorage.setItem('editContent', content);
        navigate('/editPost')
    };

    const submit = () => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you would like to delete this post? This action cannot be undone.',
            buttons: [
                {
                    label: 'No',
                    className: "buttonNo",
                    onClick: () => {
                        console.log("Clicked No")
                    }
                },
                {
                    label: 'Yes',
                    className: "buttonYes",
                    onClick: () => {
                        const deletePost = async () => {
                            try {
                                await axios.post(
                                    `http://localhost:5000/post/delete`,
                                    { postId: id, posterUserId: post.posterUserId },
                                    { withCredentials: true }
                                );
                                history.go(-1)
                            }
                            catch (error) {
                                console.error("Error Deleting Post:", error)
                            }
                        }
                        deletePost();
                    }
                }
            ]
        });
    };

    const upvotePost = async () => {
        try {
            const userId = localStorage.getItem("currentUser");
            if (!userId) {
                console.error("User not logged in");
                return;
            }

            if (upvoted) {
                console.log("Already upvoted");
                return;
            }

            await axios.post("http://localhost:5000/post/upvotepost", {
                postId: post._id,
                userId,
            });

            setUpvoted(true);
            updatePostLikes(true);
        } catch (error) {
            console.error("Error upvoting post:", error);
        }
    };

    const removeUpvote = async () => {
        try {
            const userId = localStorage.getItem("currentUser");
            if (!userId) {
                console.error("User not logged in");
                return;
            }

            if (!upvoted) {
                console.log("Not upvoted");
                return;
            }

            await axios.post("http://localhost:5000/post/removeupvotepost", {
                postId: post._id,
                userId,
            });

            setUpvoted(false);
            updatePostLikes(false);
        } catch (error) {
            console.error("Error removing upvote:", error);
        }
    };

    const updatePostLikes = (isUpvote) => {
        setPost(prevPost => ({
            ...prevPost,
            upvotes: prevPost.upvotes + (isUpvote ? 1 : -1)
        }));
    };

    return (
        <div className="mt-4 cursor-pointer">
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <RiseLoader color={"#1976D2"} loading={true} size={10} />
                </div>
            ) : (
                post && (
                    <div key={post._id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                        <div className="flex items-center mb-2 cursor-pointer">
                            <div className=" overflow-hidden rounded-full h-8 w-8 bg-white mr-2">
                                <Link to={`/user/${post.posterUsername}`}>
                                    <img src={`https://robohash.org/${post.posterUsername}`} alt="User Avatar" />
                                </Link>
                            </div>

                            <a><Link to={`/user/${post.posterUsername}`}><span className="text-blue-500 hover:text-[#1976d2e2] hover:underline text-2xl font-bold md:text-lg ">{post.posterUsername}</span></Link></a>
                            <span className="text-gray-500 mx-1">•</span>
                            <span className="text-gray-500 text-sm md:text-lg font-bold">{format(post.postedOn)}</span>
                            {post.isEdited && (
                                <span className="text-gray-500  text-sm md:text-lg font-bold ml-2">[edited]</span>
                            )}
                            {post.posterUsername === currentUser && (
                                <>
                                    <FiEdit className='text-white text-2xl ml-5 mt-1 md:text-lg hover:text-gray-500' onClick={() => handleEdit(post._id, post.title, post.content)} />
                                    <MdDeleteOutline className='text-red-500 items-center text-3xl ml-3 mt-1 md:text-xl hover:text-gray-500' onClick={submit} />
                                </>
                            )}
                        </div>
                        <ReactMarkdown className="text-white text-2xl mb-2 font-bold">{post.title}</ReactMarkdown>
                        <ReactMarkdown className="text-white mb-2 text-lg ">{post.content}</ReactMarkdown>
                        <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                            {upvoted ? (
                                <button className="flex items-center text-white">
                                    <FaRegArrowAltCircleUp className="mr-2.5 text-white hover:text-[#1976d2e2]" onClick={removeUpvote} /> {formatScore(post.upvotes)}
                                </button>
                            ) : (
                                <button className={`flex items-center text-[#1976D2] hover:text-[#1976d2e2] ${upvoted ? "text-white" : ""}`} onClick={upvotePost}>
                                    <FaRegArrowAltCircleUp className="mr-2.5 text-[#1976D2] hover:text-[#1976d2e2]" /> {formatScore(post.upvotes)}
                                </button>
                            )}
                            <button className="flex ml-5 items-center text-[#1976D2] hover:text-[#1976d2e2]">
                                <BiCommentMinus className="mr-2 mt-0.5" /> {post.totalComments}
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default IndiPost;
