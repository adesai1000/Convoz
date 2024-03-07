import React from 'react';
import './ActiveConv.scss';

export const ActiveConv = ({ conversation, currentUser }) => {
    // Get the index of the current user in the members array
    const userIndex = conversation.members.indexOf(currentUser);

    // Determine the index of the other user
    const otherUserIndex = userIndex === 0 ? 3 : 2;

    // Get the name of the other user
    const otherUserName = conversation.members[otherUserIndex];

    return (
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={`https://robohash.org/${otherUserName}`} alt={otherUserName} />
                    <div className="chatOnlineBadge"></div>
                </div>
                <div className="chatOnlineName">{otherUserName}</div>
            </div>
        </div>
    );
};
