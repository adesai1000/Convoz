/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import Fetch from '../../components/Fetch';
import Navbar from '../../components/Navbar';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { Message } from '../../components/message/Message';
import './Messenger.scss'
import { useUser } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Messenger() {
    const [conversations, setConversations] = useState([])
    const { user } = useUser();
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:3000/conversations/" + user);
                setConversations(res.data)
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };
        getConversations();
    }, [user]);


    return (
        <>
            <Fetch />
            <Navbar />
            <div className="messenger">
                <div className='chatMenu'>
                    <div className="chatMenuWrapper">
                        <div className='convoHeading'>Your Conversations</div>
                        <input placeholder='Search...' className='chatMenuInput' />
                        {conversations.map((c) => (
                            <ChatOnline conversation={c} currentUser={user} />
                        ))}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className="chatBoxWrapper">
                        <div className='messageHeading'>{user}</div>
                        <div className="chatBoxTop">
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
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
