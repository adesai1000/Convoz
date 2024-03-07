import Navbar from '../../components/Navbar';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ActiveConv } from '../../components/ActiveConv/ActiveConv';
import './Messenger.scss'
import { Message } from '../../components/message/message';
import { RiMessageLine } from "react-icons/ri";

export default function Messenger() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [id, setId] = useState("")
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([])
    const [showPopup, setShowPopup] = useState(false);

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
    const handleBack = () =>{
        navigate("/home")
    }
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

    useEffect(() => {
        const isPhone = () => window.innerWidth <= 768;
        if (isPhone()) {
            setShowPopup(true);
        }
        window.addEventListener('resize', () => {
            if (isPhone()) {
                setShowPopup(true);
            } else {
                setShowPopup(false);
            }
        });
        return () => {
            window.removeEventListener('resize', () => {});
        };
    }, []);

    const userChats = async () => {
        const API = axios.create({ baseURL: 'http://localhost:5000' });
        return API.get(`/chat/${id}`);
    };

    return (
        <>
            <Navbar username={username} />
            <div className="messenger">
                {showPopup && (
                    <>
                    <div className="phone-overlay" />
                    <div className="phone-popup">
                        <p>This feature is exlusive to bigger screens for an optimal experience.</p>
                        <a className="back"onClick={handleBack}>Go Back</a>
                    </div>
                </>
                )}
                <div className='chatMenu'>
                    <div className="chatMenuWrapper">
                        <div className='convoHeading'>Convoz</div>
                        {conversations.map((conversation) => (
                            <ActiveConv key={conversation._id} conversation={conversation} currentUser={id} />
                        ))}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className="chatBoxWrapper">
                        {
                            currentChat ? 
                        <>
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
                        </div> </>: <>
                        <div className='defaultDisplay'>
                        <RiMessageLine size="5rem" />
                        <div className="defaultDisplayHeading">Convoz Messenger</div>
                            <div className='defaultDisplayText'>Message any user securely!</div>
                        </div>
                        </>}
                    </div>
                </div>
            </div>
        </>
    )
}
