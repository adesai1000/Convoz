import Fetch from '../../components/Fetch';
import Navbar from '../../components/Navbar';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { Conversations } from '../../components/conversations/Conversations';
import { Message } from '../../components/message/Message';
import './Messenger.scss'
//import { useUser } from '../context/UserContext';
export default function Messenger() {
    //const { user } = useUser();

    return (
        <>
            <Fetch />
            <Navbar />
            <div className="messenger">
                <div className='chatMenu'>
                    <div className="chatMenuWrapper">
                        <input placeholder='Search...' className='chatMenuInput' />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                        <Conversations />
                    </div>
                </div>
                <div className='chatBox'>
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className='chatMessageInput' placeholder='Message'></textarea>
                            <button className='chatSubmitButton'>Send</button>
                        </div>
                    </div>
                </div>
                <div className="onlineBox">
                    <div className="onlineBoxWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>

    )
}
