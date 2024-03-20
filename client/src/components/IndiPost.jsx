import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown} from 'react-icons/fa';
import { BiCommentMinus } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const IndiPost = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([
        { id: 1, user: "ayush", title: "My thoughts on iPhone 15 Pro", text: "Commentary: Remarkable CPU and battery test scores show the power of the iPhone 15 Pro and Pro Max. Plus, get the whole scoop on overheating. Commentary: Remarkable CPU and battery test scores show the power of the iPhone 15 Pro and Pro Max. Plus, get the whole scoop on overheating. Commentary: Remarkable CPU and battery test scores show the power of the iPhone 15 Pro and Pro Max. Plus, get the whole scoop on overheating.", likes: 500, comments: 25 },
    ]);

    const handlePost = () => {
        navigate("/posts");
    };

    const handleLike = (postId) => {
        // Placeholder for like functionality
    };

    const handleComment = (postId) => {
        // Placeholder for comment functionality
    };

    const handleProfile = () => {
        try {
            navigate("/profile");
        } catch (error) {
            console.error("Error navigating to profile:", error);
        }
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
        <div className="mt-4 cursor-pointer" onClick={handlePost}>
            {posts.map((post) => (
                <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                    <div className="flex items-center mb-2 cursor-pointer" >
                        <div className="rounded-full h-8 w-8 bg-white mr-2">
                        <a href='/profile'><img src="https://robohash.org/ayush" alt="User Avatar" /></a>
                        </div>
                        <a href='/profile'><span className="text-blue-500  text-2xl font-bold md:text-lg">{post.user}</span></a>
                        <span className="text-gray-500 mx-1">•</span>
                        <span className="text-gray-500 text-lg font-bold">7 days ago</span>
                        <FiEdit className='text-white text-2xl ml-5 mt-1 md:text-lg hover:text-gray-500'/>
                        <MdDeleteOutline className='text-red-500 items-center text-3xl ml-3 mt-1 md:text-xl hover:text-gray-500' onClick={submit}/>
                    </div>
                    <div className="text-white text-2xl mb-2 font-bold">{post.title}</div>
                    <div className="text-white mb-2 text-lg font-semibold">{post.text}</div>
                    <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                        <button className="flex items-center text-[#1976D2]">
                            <FaRegArrowAltCircleUp className="mr-2.5 text-white" /> {post.likes}
                        </button>
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

export default IndiPost;
