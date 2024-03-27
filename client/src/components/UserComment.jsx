import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from 'react-icons/fa';
import SyncLoader from "react-spinners/SyncLoader";
import { format } from "timeago.js";
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const MyComment = ({ username, sortingOption }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:5000/comment/all",
                { username: username },
                { withCredentials: true }
            );

            let sortedComments = response.data;

            if (sortingOption === 'oldest') {
                sortedComments.sort((a, b) => new Date(a.postedOn) - new Date(b.postedOn));
            } else if (sortingOption === 'latest') {
                sortedComments.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
            }
            else if (sortingOption === 'likes') {
                sortedComments.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
            }

            setComments(sortedComments);
        } catch (error) {
            console.error("Error Fetching Data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [username, sortingOption]);

    return (
        <div className="mt-4 cursor-pointer">
            <h1 className='text-white text-4xl font-bold mb-4'>Comments</h1>
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <SyncLoader color={"#1976D2"} loading={true} size={10} />
                </div>
            ) : (
                comments.length === 0 ? (
                    <div className="text-white text-xl text-center font-bold">No comments yet.</div>
                ) : (
                    comments.map(comment => (
                        <div key={comment._id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                            <div className="flex items-center mb-2 cursor-pointer" >
                                <div className="rounded-full h-8 w-8 bg-white mr-2 overflow-hidden">
                                    <Link to={`/user/${comment.commenterUsername}`}>
                                        <img src={`https://robohash.org/${comment.commenterUsername}`} alt="User Avatar" />
                                    </Link>
                                </div>
                                <Link to={`/user/${comment.commenterUsername}`}>
                                    <span className="text-blue-500  text-2xl font-bold md:text-lg">{comment.commenterUsername}</span>
                                </Link>
                                <span className="text-gray-500 mx-1">•</span>
                                <span className="text-gray-500 text-sm md:text-lg font-bold">{format(comment.postedOn)}</span>
                                {comment.isEdited && (
                                    <span className="text-gray-500  text-sm md:text-lg font-bold ml-2">[edited]</span>
                                )}
                            </div>
                            <Link to={`/posts/${comment.postId}`}>
                            <ReactMarkdown className="text-white text-xl">{comment.content}</ReactMarkdown>
                            </Link>
                            <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                                <button className="flex items-center text-[#1976D2]">
                                    <FaRegArrowAltCircleUp className="mr-2.5 text-white" /> {comment.upvotes}
                                </button>
                                <button className=" text-[#1976D2]">
                                    <FaRegArrowAltCircleDown className="ml-2.5" />
                                </button>
                            </div>
                        </div>
                    ))
                )
            )}
        </div>
    );
};

export default MyComment;