/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { markdown } from "markdown";

const Comment = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const [markdownContent, setMarkdownContent] = useState("");

    const handleBack = () => {
        history.go(-1)
    }

    const handleSubmit = () => {
        //console.log("Content:", content);
    }

    const convertMarkdownToHTML = (markdownText) => {
        return markdown.toHTML(markdownText);
    };

    const renderMarkdownContent = () => {
        const htmlContent = convertMarkdownToHTML(content);
        setMarkdownContent(htmlContent);
    };

    return (
        <div>
            <div className="min-h-screen bg-black flex flex-col justify-start sm:flex-row items-start sm:justify-center border-slate-600">
                <div className="w-full item-start md:w-full">
                    <div className="border-2 border-slate-600 pl-4 pr-4 pt-2 rounded md:flex-row items-center justify-between   text-white">
                        <h1 className="text-3xl">Comment</h1>
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
                                className="bg-[#1976D2] text-white p-2 rounded w-full"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
