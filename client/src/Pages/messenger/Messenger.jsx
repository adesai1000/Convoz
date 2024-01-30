import Fetch from '../../components/Fetch';
import Navbar from '../../components/Navbar';
import ChatOnline from '../../components/chatOnline/ChatOnline';
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
                        <div className='convoHeading'>Your Conversations</div>
                        <input placeholder='Search...' className='chatMenuInput' />
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
