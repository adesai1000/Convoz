import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from "timeago.js";
import ReactMarkdown from 'react-markdown';
import RightSide from "../components/RightSide";
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';

const SearchView = () => {
  const [results, setResults] = useState({ users: [], posts: [] });
  const { query } = useParams();
  const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const handleBack = () => {
        history.go(-1)
    }
  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            if (!cookies.token) {
                navigate("/login");
                return;
            }
            const response = await axios.post(
                "http://localhost:5000",
                {},
                { withCredentials: true }
            );
            const { status, user } = response.data;
            if (status) {
                setUsername(user.username);
            } else {
                removeCookie("token");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
}, [cookies, navigate, removeCookie]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/search/?q=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start">
        <div className="md:w-1/2 p-4 justify-center ">
        <button className="bg-[#1976D2] hover:bg-[#1976d2e2] text-white p-3 rounded mb-5" onClick={handleBack}><IoArrowBack /></button>
        <p className="text-white text-3xl font-bold mb-5">Showing Results for "{query}"</p>
            {results.posts.length > 0 && (
                <div className="mb-4">
                    <h2 className="mb-4 text-white text-4xl font-bold">Posts</h2>
                    {results.posts.map(post => (
                        <div key={post._id} className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]">
                            <div className="flex items-center mb-2">
                            <Link to={`/user/${post.posterUsername}`}>
                                <div className="overflow-hidden rounded-full h-8 w-8 bg-white mr-2">
                                    <img src={`https://robohash.org/${post.posterUsername}`} alt="User Avatar" />
                                </div>
                                </Link>
                                <Link to={`/user/${post.posterUsername}`}>
                                <span className="text-[#1976D2] hover:text-[#1976d2e2] hover:underline text-xl font-bold md:text-lg">{post.posterUsername}</span>
                                </Link>
                                <span className="text-gray-500 mx-1">•</span>
                                <span className="text-gray-500 text-lg font-bold">{format(post.postedOn)}</span>
                                {post.isEdited && (
                                    <span className="text-gray-500  text-lg font-bold ml-2">[edited]</span>
                                )}
                            </div>
                            <Link to={{ pathname: `/posts/${post._id}` }}>
                            <h3 className="text-white text-2xl mb-2 font-bold">
                                <ReactMarkdown>{post.title}</ReactMarkdown>
                            </h3>
                            </Link>
                            <Link to={{ pathname: `/posts/${post._id}` }}>
                            <p className="text-white mb-2 text-xl">
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                            </p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {results.posts.length === 0 && (
                <div className="text-left mt-8">
                    <h2 className="text-2xl font-bold text-red-600">No posts available</h2>
                    <p className="text-[#1976D2] text-xl underline underline-offset-3 font-bold cursor-pointer"><a onClick={handleBack}>
                    Go Back </a></p>
                </div>
            )}

            {results.users.length > 0 && (
                <div className="mb-4 justify-center">
                    <h2 className="text-4xl font-bold mb-4 text-white">Users</h2>
                    {results.users.map(user => (
                        <div key={user._id} className="mb-3 border-2 border-slate-600 p-3 rounded">
                            <div className="flex justify-between items-center">
                                <div className="relative flex rounded-full bg-[#E8E8E8] h-10 w-10">
                                    <img src={`https://robohash.org/${user.username}`} alt={`user-${user._id}`} />
                                    <p className="ml-4 text-white justify-center text-2xl font-bold">{user.username}</p>
                                </div>
                                <Link to={`/user/${user.username}`}>
                                <span className="flex items-center text-[#1976D2] hover:text-[#1976d2e2] hover:underline justify-center cursor-pointer text-2xl font-bold">View</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {results.users.length === 0 && (
                <div className="text-left mt-8 font-bold">
                    <h2 className="text-2xl font-bold text-red-600">No users available</h2>
                    <p className="text-[#1976D2] text-xl underline underline-offset-3 font-bold cursor-pointer"><a onClick={handleBack}>
                    Go Back </a></p>
                </div>
            )}
        </div>
        <RightSide />
    </div>
  );
};

export default SearchView;