import React, { useEffect, useState } from 'react';
import './ActiveConv.scss';

export const ActiveConv = ({ conversation, currentUser }) => {
    // Extracting the name of the receiver (last element of the members array)
    //const receiverName = conversation.members.find(member => member !== currentUser);
    const receiverName = conversation.members[conversation.members.length - 1];
    return (
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    {/* Here you can use the receiverName to display the receiver's image */}
                    <img className="chatOnlineImg" src={`https://robohash.org/${receiverName}`} alt={receiverName} />
                    <div className="chatOnlineBadge"></div>
                </div>
                {/* Displaying the receiver's name */}
                <span className="chatOnlineName">{receiverName}</span>
            </div>
        </div>
    );
};
