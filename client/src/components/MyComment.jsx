import React, { useState, useEffect } from "react";
import axios from "axios";
import RiseLoader from "react-spinners/RiseLoader";
import { format } from "timeago.js";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { TbEditCircle } from "react-icons/tb";
import { MdOutlineVerified } from "react-icons/md";

const MyComment = ({ username, sortingOption }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://convoz.onrender.com/comment/all",
        { username: username },
        { withCredentials: true }
      );

      let sortedComments = response.data;

      if (sortingOption === "oldest") {
        sortedComments.sort(
          (a, b) => new Date(a.postedOn) - new Date(b.postedOn)
        );
      } else if (sortingOption === "latest") {
        sortedComments.sort(
          (a, b) => new Date(b.postedOn) - new Date(a.postedOn)
        );
      } else if (sortingOption === "likes") {
        sortedComments.sort(
          (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
        );
      }

      setComments(sortedComments);
    } catch (error) {
      console.error("Error Fetching Data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [username, sortingOption]);

  const submit = (commentId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message:
        "Are you sure you would like to delete this comment? This action cannot be undone.",
      buttons: [
        {
          label: "No",
          className: "buttonNo",
          onClick: () => {
            console.log("Clicked No");
          },
        },
        {
          label: "Yes",
          className: "buttonYes",
          onClick: () => {
            const deleteComment = async () => {
              try {
                await axios.post(
                  `https://convoz.onrender.com/comment/delete`,
                  { commentId: commentId, commenterUsername: username },
                  { withCredentials: true }
                );
                fetchComments();
              } catch (error) {
                console.error("Error Deleting Comment:", error);
              }
            };

            deleteComment();
          },
        },
      ],
    });
  };
  const handleEdit = (postId, content) => {
    localStorage.setItem("editPostId", postId);
    localStorage.setItem("editContent", content);
    navigate("/editComment");
  };

  return (
    <div className="mt-4 cursor-pointer">
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <RiseLoader color={"#1976D2"} loading={true} size={10} />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-white text-xl text-center font-bold">
          {username} has made no comments yet.
        </div>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]"
          >
            <div className="flex items-center mb-2 cursor-pointer">
              <div className="rounded-full h-8 w-8 bg-white mr-2 overflow-hidden">
                <Link to={`/user/${comment.commenterUsername}`}>
                  <img
                    src={`https://robohash.org/${comment.commenterUsername}`}
                    alt="User Avatar"
                  />
                </Link>
              </div>
              <Link to={`/user/${comment.commenterUsername}`}>
                <span className="text-[#1976D2] hover:text-[#1976d2e2] hover:underline text-2xl font-bold md:text-lg">
                  {comment.commenterUsername}
                </span>
              </Link>
              {comment.isVip && (
                <MdOutlineVerified className="ml-2 text-xl text-yellow-500" />
              )}
              <span className="text-gray-500 mx-1">•</span>
              <span className="text-gray-500 text-sm md:text-lg font-bold">
                {format(comment.postedOn)}
              </span>
              {comment.isEdited && (
                <span className="text-gray-500  text-sm md:text-lg font-bold ml-2">
                  <TbEditCircle />
                </span>
              )}
              {comment.commenterUsername === username && (
                <>
                  <FiEdit
                    className="text-white text-2xl ml-5 mt-1 md:text-lg hover:text-gray-500"
                    onClick={() => handleEdit(comment._id, comment.content)}
                  />
                  <MdDeleteOutline
                    className="text-red-500 items-center text-3xl ml-3 mt-1 md:text-xl hover:text-gray-500"
                    onClick={() => submit(comment._id)}
                  />
                </>
              )}
            </div>
            <Link to={`/posts/${comment.postId}`}>
              <ReactMarkdown className="text-white text-xl">
                {comment.content}
              </ReactMarkdown>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default MyComment;
