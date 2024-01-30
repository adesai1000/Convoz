/* eslint-disable no-unused-vars */
import React from 'react'
import './ChatOnline.scss'

const ChatOnline = () => {
    return (
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src='https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg' alt='' />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">ayush</span>
            </div>
        </div>
    )
}

export default ChatOnline