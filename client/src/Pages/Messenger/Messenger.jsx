/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import Navbar from '../../components/Navbar';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ActiveConv } from '../../components/ActiveConv/ActiveConv';
import './Messenger.scss'
import { Message } from '../../components/message/message';

export default function Messenger() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [id, setId] = useState("")
    const [converstations, setConversations] = useState([]);

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {   
                navigate("/login");
            }
            try {
                const { data } = await axios.post(
                    "http://localhost:5000",
                    {},
                    { withCredentials: true }
                );
                const { user } = data;
                setUsername(user.username);
                setId(user._id)
            } catch (error) {
                console.error(error);
                removeCookie("token");
                navigate("/login");
            }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(username);
                setConversations(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (username) {
            getChats();
        }
    }, [username]);

    const userChats = async () => {
        const API = axios.create({ baseURL: 'http://localhost:5000' });
        return API.get(`/chat/${id}`);
    };
    return (
        <>
            <Navbar username={username} />
            <div className="messenger">
                <div className='chatMenu'>
                    <div className="chatMenuWrapper">
                        <div className='convoHeading'>Conversations</div>
                        {converstations.map((conversation) => (
    <ActiveConv key={conversation._id} conversation={conversation} currentUser={id} />
))}

                    </div>
                    
                </div>
                <div className='chatBox'>
                    <div className="chatBoxWrapper">
                        <div className='messageHeading'>ayush</div>
                        <div className="chatBoxTop">
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className='chatMessageInput' placeholder='Message'></textarea>
                            <button className='chatSubmitButton'>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}