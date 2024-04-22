import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaRegStar } from "react-icons/fa";
import { SlReload } from "react-icons/sl";
import RiseLoader from "react-spinners/RiseLoader";
import { Link } from 'react-router-dom';
import { MdOutlineDeleteForever } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdOutlineVerified } from "react-icons/md";

const ProfRight = ({ username, verified }) => {
    const [cookies, removeCookie] = useCookies([]);
    const [loading, setLoading] = useState(true);
    const [userid, setUserid] = useState(null)
    const navigate = useNavigate();

    const id = localStorage.getItem('currentUser')


    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://convoz.onrender.com/post/all');
                const filteredPosts = response.data.filter(post => post.posterUsername === username);
                setPosts(filteredPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [username]);

    useEffect(() => {
        const fetchUserUsername = async () => {
            try {
                const response = await axios.post(
                    "https://convoz.onrender.com/chat/finduid",
                    { userUsername: username },
                    { withCredentials: true }
                );

                setUserid(response.data.userUID);
            } catch (error) {
                console.error("Error fetching user Username:", error);
            }
        };
        fetchUserUsername();
    }, [username]);

    const deleteAccount = () => {
        confirmAlert({
            title: '☠️ CAUTION ☠️',
            message: 'Deleting your account will remove your Profile, Posts, Comments, Chats and Messages, it will be like YOU WERE NEVER HERE.',
            buttons: [
                {
                    label: 'No',
                    className: "buttonNo",
                    onClick: () => {
                        //console.log("Clicked No")
                    }
                },
                {
                    label: 'Yes',
                    className: "buttonYes",
                    onClick: () => {
                        const deleteUser = async () => {
                            try {
                                await axios.post(
                                    `https://convoz.onrender.com/delete`,
                                    { userId: id },
                                    { withCredentials: true }

                                );
                                removeCookie("token");
                                localStorage.removeItem("currentUser");
                                navigate("/login");
                            }
                            catch (error) {
                                console.error("Error Deleting Profile:", error)
                            }
                        }
                        deleteUser();
                    }
                }
            ]
        });
    };
    return (
        <div className="w-full px-4 pt-5 md:w-1/4 md:top-0 md:p-4 md:items-center md:justify-center">
            <div className="border-2 border-slate-600 rounded mb-4 justify-center">
                <div className="justify-center items-center text-center">
                    <img
                        src={`https://robohash.org/${username}`}
                        alt="Profile"
                        className="bg-[#E8E8E8] p-2 h-3/5 w-3/5 overflow-hidden rounded-full mx-auto mt-5"
                    />
                    <div className='flex flex-row justify-center items-center'>
                        <p className="mt-2 text-white text-2xl font-bold items-center justify-center">{username}</p>
                        {verified && (
                            <MdOutlineVerified className='mt-2 ml-2 text-2xl text-yellow-500 items-center' />
                        )}
                    </div>
                    <div className="mt-2 mb-2 text-white font-bold">
                        Total Posts: {posts.length}
                    </div>
                </div>
                {id === userid && (
                    <a onClick={deleteAccount}><MdOutlineDeleteForever className='text-red-600 text-3xl mb-1 hover:text-red-700' /></a>
                )}

            </div>
            <div className="md:block">
                <div className="md:mb-4 border-2 border-slate-600 p-3 rounded flex gap-4">
                    <FaRegStar className="mt-1 text-4xl md:text-2xl text-yellow-500 max-h-90%" />
                    <div className="text-2xl md:text-xl text-white font-bold">Don't forget to star the <a href="https://github.com/adesai1000/Convoz" target=" _blank" className="text-[#1976D2] underline hover:text-[#1976d2e2]  font-semibold"> Repo!</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfRight;
