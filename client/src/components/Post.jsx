import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown} from 'react-icons/fa';
import { BiCommentMinus } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import {format} from "timeago.js"

const Post = ({username}) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/post/all'); 
                console.log(response)
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();

    }, []);

    const handlePost = () => {
        navigate("/posts");
    };


    const confirmDelete = (postId) => {
        confirmAlert({
          title: 'Confirm Deletion',
          message: 'Are you sure you would like to delete this post? This action cannot be undone.',
          buttons: [
            {
              label: 'No',
              className: "buttonNo",
              onClick: () => console.log('Clicked No')
            },
            {
              label: 'Yes',
              className: "buttonYes",
              onClick: () => handleDelete(postId)
            }
          ]
        });
    };

    return (
        <div className="mt-4 cursor-pointer" >
            {posts.map((post) => (
                <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                    <div className="flex items-center mb-2 cursor-pointer">
                        <div className="rounded-full h-8 w-8 bg-white mr-2">
                            <a href='/profile'><img src={`https://robohash.org/${post.posterUsername}`}  alt="User Avatar" /></a>
                        </div>
                        <a href='/profile'><span className="text-blue-500  text-xl font-bold md:text-lg">{post.posterUsername}</span></a>
                        <span className="text-gray-500 mx-1">•</span>
                        <span className="text-gray-500 text-lg font-bold">{format(post.postedOn)}</span>
                        {username === post.posterUsername && (
                            <>
                                <FiEdit className='text-white text-2xl ml-5 mt-1 md:text-lg hover:text-gray-500'/>
                                <MdDeleteOutline className='text-red-500 items-center text-3xl ml-3 mt-1 md:text-xl hover:text-gray-500' onClick={() => confirmDelete(post.id)}/>
                            </>
                        )}
                        
                    </div>
                    <div className="text-white text-2xl mb-2 font-bold" onClick={handlePost}>{post.title}</div>
                    <div className="text-white mb-2 text-xl" onClick={handlePost}>{post.content}</div>
                    <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                        <button className="flex items-center text-[#1976D2]">
                            <FaRegArrowAltCircleUp className="mr-2.5 text-white" /> 
                        </button>
                        <a>{post.totalScore}</a>
                        <button className=" text-[#1976D2]">
                            <FaRegArrowAltCircleDown className="ml-2.5" />
                        </button>
                        <button className="flex ml-10 items-center text-[#1976D2]">
                            <BiCommentMinus  className="mr-2 mt-1" /> {post.totalComments}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Post;
