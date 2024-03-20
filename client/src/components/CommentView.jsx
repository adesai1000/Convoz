import React, { useState } from 'react';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown} from 'react-icons/fa';

const CommentView = () => {
    const [posts, setPosts] = useState([
        { id: 1, user: "jay",text: "It is an amazing product!", likes: 500, comments: 25 },
        { id: 2, user: "emma",text: "It pairs seamlessly with the new Series 9 and the Apple Watch Ultra 2.", likes: 100, comments: 30 },
        { id: 3, user: "jack",text: "Got mine Last Week and I already LOVE it!", likes: 10, comments: 5 },
    ]);


    return (
        <div className="mt-4 cursor-pointer">
            <h1 className='text-white text-4xl font-bold mb-4'>Comments</h1>
            {posts.map((post) => (
                <div key={post.id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                    <div className="flex items-center mb-2 cursor-pointer" >
                        <div className="rounded-full h-8 w-8 bg-white mr-2">
                        <a href='/profile'><img src={`https://robohash.org/${post.user}`} alt="User Avatar" /></a>
                        </div>
                        <a href='/profile'><span className="text-blue-500  text-2xl font-bold md:text-lg">{post.user}</span></a>
                        <span className="text-gray-500 mx-1">•</span>
                        <span className="text-gray-500 text-lg font-bold">7 days ago</span>
                    </div>
                    <div className="text-white text-xl">{post.text}</div>
                    <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
                        <button className="flex items-center text-[#1976D2]">
                            <FaRegArrowAltCircleUp className="mr-2.5 text-white" /> {post.likes}
                        </button>
                        <button className=" text-[#1976D2]">
                            <FaRegArrowAltCircleDown className="ml-2.5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentView;
