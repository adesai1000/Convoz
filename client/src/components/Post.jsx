/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown} from 'react-icons/fa';
import { BiCommentMinus } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Post = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([
        { id: 1, user: "ayush", title: "My thoughts on iPhone 15 Pro", text: "Commentary: Remarkable CPU and battery test scores show the power of the iPhone 15 Pro and Pro Max. Plus, get the whole scoop on overheating. ", likes: 500, comments: 25 },
        { id: 2, user: "emma", title: "M3 Pro Macbook Pro", text: "Laptop upgrade adds M3 chips, more power, longer battery life, brighter screen, lower price and darker colour.", likes: 100, comments: 30 },
        { id: 3, user: "jack", title: "Apple watch banned in US?", text: "The Apple Watch Series 9 and Watch Ultra 2 were both banned in the US late last year as the result of a patent dispute with medical device maker Masimo.", likes: 10, comments: 5 },
    ]);

    const handlePost = () => {
        navigate("/posts");
    };

    const handleComment = (postId) => {
        // Placeholder for comment functionality
    };
     const submit = () => {
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
              onClick: () => console.log('Clicked Yes')
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
                        <a href='/profile'><img src={`https://robohash.org/${post.user}`}  alt="User Avatar" /></a>
                        </div>
                        <a href='/profile'><span className="text-blue-500  text-xl font-bold md:text-lg">{post.user}</span></a>
                        <span className="text-gray-500 mx-1">•</span>
                        <span className="text-gray-500 text-lg font-bold">7 days ago</span>
                        <FiEdit className='text-white text-2xl ml-5 mt-1 md:text-lg hover:text-gray-500'/>
                        <MdDeleteOutline className='text-red-500 items-center text-3xl ml-3 mt-1 md:text-xl hover:text-gray-500' onClick={submit}/>
                    </div>
                    <div className="text-white text-2xl mb-2 font-bold" onClick={handlePost}>{post.title}</div>
                    <div className="text-white mb-2 text-xl" onClick={handlePost}>{post.text}</div>
                    <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                        
                        <button className="flex items-center text-[#1976D2]">
                            <FaRegArrowAltCircleUp className="mr-2.5 text-white" /> 
                        </button>
                        <a>{post.likes}</a>
                        <button className=" text-[#1976D2]">
                            <FaRegArrowAltCircleDown className="ml-2.5" />
                        </button>
                        <button onClick={() => handleComment(post.id)} className="flex ml-10 items-center text-[#1976D2]">
                            <BiCommentMinus  className="mr-2 mt-1" /> {post.comments}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Post;
