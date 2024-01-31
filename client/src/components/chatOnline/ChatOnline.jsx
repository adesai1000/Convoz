/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './ChatOnline.scss'
import { Axios } from 'axios';

const ChatOnline = ({ conversation, currentUser }) => {
    return (
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src='https://robohash.org/emma' alt='' />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">emma</span>
            </div>
        </div>
    )
}

export default ChatOnline