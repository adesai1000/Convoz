/* eslint-disable no-unused-vars */
import React from 'react'
import './Message.scss'
export const Message = () => {
    return (
        <div className='message'>
            <div className="messageTop">
                <img className="messageImg" src='https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg' alt='' />
                <p className='messageText'>This is a message </p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}
