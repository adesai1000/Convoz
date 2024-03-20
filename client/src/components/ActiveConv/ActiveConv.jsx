import React from 'react';
import './ActiveConv.scss';

export const ActiveConv = ({ conversation, currentUser }) => {
    const userIndex = conversation.members.indexOf(currentUser);

    const otherUserIndex = userIndex === 0 ? 3 : 2;

    const otherUserName = conversation.members[otherUserIndex];

    return (
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={`https://robohash.org/${otherUserName}`} alt={otherUserName} />
                </div>
                <div className="chatOnlineName">{otherUserName}</div>
            </div>
        </div>
    );
};
