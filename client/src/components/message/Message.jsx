/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './Message.scss'
export const Message = ({ own }) => {
    return (
        <div className={own ? "message own " : "message"} >
            <div className="messageTop">
                <img className="messageImg" src='https:robohash.org/ayushdesai' alt='' />
                <p className='messageText'>This is a message </p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}
