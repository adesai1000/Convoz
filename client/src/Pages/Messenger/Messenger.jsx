import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { ActiveConv } from "../../components/ActiveConv/ActiveConv";
import { Message } from "../../components/message/Message";
import { RiMessageLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import "./Messenger.scss";

export default function Messenger() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        // navigate("/login");
      }
      try {
        const { data } = await axios.post(
          "https://convoz.onrender.com/",
          {},
          { withCredentials: true }
        );
        const { user } = data;
        setUsername(user.username);
        setId(user._id);
      } catch (error) {
        console.error(error);
        // removeCookie("token");
        // navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(username);
        setConversations(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (username) {
      getChats();
    }
  }, [username]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `https://convoz.onrender.com/message/${currentChat?._id}`
        );
        setMessages(res.data);
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChat) {
      const intervalId = setInterval(getMessages, 1000);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      return () => clearInterval(intervalId);
    }
  }, [currentChat]);

  const userChats = async () => {
    const API = axios.create({ baseURL: "https://convoz.onrender.com/" });
    return API.get(`/chat/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      chatId: currentChat._id,
      senderId: id,
      text: newMessage,
    };
    try {
      await axios.post(`https://convoz.onrender.com/message`, message);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar username={username} />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="convoHeading">Convoz</div>
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <ActiveConv conversation={conversation} currentUser={id} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="messageHeading">
                  {id === currentChat.members[0]
                    ? currentChat.members[3]
                    : currentChat.members[2]}
                </div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.senderId === id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Message"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="defaultDisplay">
                  <RiMessageLine size="5rem" />
                  <div className="defaultDisplayHeading">Convoz Messenger</div>
                  <div className="defaultDisplayText flex items-center gap-1">
                    <FaRegStar className="mr-1 text-yellow-500" />
                    Don't forget to star the{" "}
                    <a
                      href="https://github.com/adesai1000/Convoz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1976D2] underline font-semibold"
                    >
                      {" "}
                      Repo!
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
