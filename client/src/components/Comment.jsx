import { useState } from "react";
import axios from 'axios'
const Comment = ({postId, currentUser, currentUserId}) => {
    const [content, setContent] = useState("");

    const handleSubmit = async() => {
        try{
            const commenterUserId = currentUserId;
            const commenterUsername = currentUser;
            const response = await axios.post(
                "http://localhost:5000/comment/create", {
                content,
                postId,
                commenterUserId,
                commenterUsername
                }
            )
            location.reload();
        }
        catch(error){
        console.error("Error Creating Comment:", error)
        }
    }

    return (
        <div>
            <div className=" bg-black flex flex-col justify-start sm:flex-row items-start sm:justify-center border-slate-600">
                <div className="w-full item-start md:w-full">
                    <div className="border-2 border-slate-600 pl-4 pr-4 pt-2 rounded md:flex-row items-center justify-between   text-white">
                        <h1 className="text-4xl md:text-3xl font-bold">New Comment</h1>
                        <div className="flex">
                            <div>
                                <p className=" text-[#1976D2] cursor-pointer underline">
                                    <a href="https://commonmark.org/help/" target="_blank">Markdown Help</a>
                                </p>
                            </div>
                        </div>
                        <div className="data w-full mt-3 mb-3 text-lg">
                            <textarea
                                placeholder="Content*"
                                rows="5"
                                className="bg-black w-full p-2 mb-4 rounded border-2 border-slate-600 focus:outline-none"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                            <button
                                className="bg-[#1976D2] hover:bg-[#1976d2e2] text-white p-2 rounded w-full text-xl font-bold"
                                onClick={handleSubmit}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
