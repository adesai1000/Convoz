import Navbar from '../../components/Navbar';
import { ActiveConv } from '../../components/ActiveConv/ActiveConv';
import './Messenger.scss'
import { Message } from '../../components/message/message';

export default function Messenger() {

    return (
        <>
            <Navbar />
            <div className="messenger">
                <div className='chatMenu'>
                    <div className="chatMenuWrapper">
                        <div className='convoHeading'>Your Conversations</div>
                        <input placeholder='Search...' className='chatMenuInput' />
                        <ActiveConv />
                        <ActiveConv />
                        <ActiveConv />
                        <ActiveConv />
                        <ActiveConv />
                        <ActiveConv />
                        <ActiveConv />
                        <ActiveConv />
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