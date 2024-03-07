/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './Message.scss'
import {format} from "timeago.js"
export const Message = ({ message, own }) => {
    return (
        <div className={own ? "message own " : "message"} >
            <div className="messageTop">
                <img className="messageImg" src='https:robohash.org/ayush' alt='' />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}