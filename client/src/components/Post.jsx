import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { BiCommentMinus } from "react-icons/bi";
import axios from "axios";
import { format } from "timeago.js";
import ReactMarkdown from "react-markdown";
import confetti from "canvas-confetti";

const Post = ({ sortingOption }) => {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState(5);
  const [loading, setLoading] = useState(false);
  const [lastLoadClicked, setLastLoadClicked] = useState(false);
  const [upvotedPosts, setUpvotedPosts] = useState([]);

  useEffect(() => {
    const upvotedPostsFromStorage = JSON.parse(
      localStorage.getItem("upvotedPosts")
    );
    if (upvotedPostsFromStorage) {
      setUpvotedPosts(upvotedPostsFromStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("upvotedPosts", JSON.stringify(upvotedPosts));
  }, [upvotedPosts]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/post/all");
        let sortedPosts = response.data;

        if (sortingOption === "likes") {
          sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
        } else if (sortingOption === "comments") {
          sortedPosts.sort((a, b) => b.totalComments - a.totalComments);
        } else if (sortingOption === "oldest") {
          sortedPosts.sort(
            (a, b) => new Date(a.postedOn) - new Date(b.postedOn)
          );
        } else if (sortingOption === "latest") {
          sortedPosts.sort(
            (a, b) => new Date(b.postedOn) - new Date(a.postedOn)
          );
        }

        setPosts(sortedPosts);
        if (sortedPosts.length === 0) {
          setLastLoadClicked(true);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [sortingOption]);

  const loadMorePosts = () => {
    if (displayedPosts + 5 >= posts.length) {
      setLastLoadClicked(true);
    }
    setDisplayedPosts((prevCount) => prevCount + 5);
  };

  useEffect(() => {
    if (lastLoadClicked) {
      triggerConfetti();
    }
  }, [lastLoadClicked]);

  const formatScore = (score) => {
    if (score >= 1000000) {
      return (score / 1000000).toFixed(1) + "M";
    } else if (score >= 1000) {
      return (score / 1000).toFixed(1) + "k";
    } else {
      return score;
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 900,
    });
  };

  const upvotePost = async (postId) => {
    try {
      const userId = localStorage.getItem("currentUser");
      if (!userId) {
        console.error("User not logged in");
        return;
      }

      if (upvotedPosts.includes(postId)) {
        console.log("Already upvoted");
        return;
      }

      await axios.post("http://localhost:5000/post/upvotepost", {
        postId,
        userId,
      });
      setUpvotedPosts((prevUpvotedPosts) => [...prevUpvotedPosts, postId]);
      updatePostLikes(postId, true);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const removeUpvote = async (postId) => {
    try {
      const userId = localStorage.getItem("currentUser");
      if (!userId) {
        console.error("User not logged in");
        return;
      }

      if (!upvotedPosts.includes(postId)) {
        console.log("Not upvoted");
        return;
      }

      await axios.post("http://localhost:5000/post/removeupvotepost", {
        postId,
        userId,
      });
      setUpvotedPosts((prevUpvotedPosts) =>
        prevUpvotedPosts.filter((id) => id !== postId)
      );
      updatePostLikes(postId, false);
    } catch (error) {
      console.error("Error removing upvote:", error);
    }
  };

  const updatePostLikes = (postId, isUpvote) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          return { ...post, upvotes: post.upvotes + (isUpvote ? 1 : -1) };
        }
        return post;
      })
    );
  };

  const truncateContent = (content) => {
    const words = content.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return content;
  };

  useEffect(() => {
    const fetchUpvotedPosts = async () => {
      try {
        const userId = localStorage.getItem("currentUser");
        if (!userId) {
          console.error("User not logged in");
          return;
        }

        const response = await axios.post(
          "http://localhost:5000/post/allupvotedposts",
          { userId: userId },
        );
        setUpvotedPosts(response.data);
      } catch (error) {
        console.error("Error fetching upvoted posts:", error);
      }
    };

    fetchUpvotedPosts();
  }, []);

  return (
    <div className="mt-4 cursor-pointer">
      {posts.slice(0, displayedPosts).map((post) => (
        <div
          key={post.id}
          className="border-2 border-slate-600 p-4 rounded mb-4 hover:bg-[#0c0c0c]"
        >
          <div className="flex items-center mb-2 cursor-pointer">
            <div className="overflow-hidden rounded-full h-8 w-8 bg-white mr-2">
              <Link to={`/user/${post.posterUsername}`}>
                <img
                  src={`https://robohash.org/${post.posterUsername}`}
                  alt="User Avatar"
                />
              </Link>
            </div>
            <Link to={`/user/${post.posterUsername}`}>
              <span className="text-[#1976D2] hover:text-[#1976d2e2] hover:underline text-xl font-bold md:text-lg">
                {post.posterUsername}
              </span>
            </Link>
            <span className="text-gray-500 mx-1">•</span>
            <span className="text-gray-500 text-lg font-bold">
              {format(post.postedOn)}
            </span>
            {post.isEdited && (
              <span className="text-gray-500  text-lg font-bold ml-2">
                [edited]
              </span>
            )}
          </div>
          <Link
            to={{ pathname: `/posts/${post._id}` }}
            className="text-white text-2xl mb-2 font-bold"
          >
            <ReactMarkdown>{post.title}</ReactMarkdown>
          </Link>
          <Link
            to={{ pathname: `/posts/${post._id}` }}
            className="text-white mb-2 text-xl"
          >
            <ReactMarkdown>{truncateContent(post.content)}</ReactMarkdown>
          </Link>

          <div className="flex items-center text-white mt-2 text-2xl md:text-xl">
            {upvotedPosts.includes(post._id) ? (
              <button
                className="flex items-center  hover:text-[#1976d2e2] text-white"
                onClick={() => removeUpvote(post._id)}
              >
                <FaRegArrowAltCircleUp className="mr-2.5 " />
              </button>
            ) : (
              <button
                className={`flex items-center text-[#1976D2] hover:text-[#1976d2e2] ${
                  upvotedPosts.includes(post._id) ? "text-white" : ""
                }`}
                onClick={() => upvotePost(post._id)}
                disabled={upvotedPosts.includes(post._id)}
              >
                <FaRegArrowAltCircleUp className="mr-2.5 " />
              </button>
            )}

            <a>{formatScore(post.upvotes)}</a>
            <Link to={{ pathname: `/posts/${post._id}` }}>
              <button className="flex ml-5 items-center text-[#1976D2] hover:text-[#1976d2e2]">
                <BiCommentMinus className="mr-2 mt-0.5" /> {post.totalComments}
              </button>
            </Link>
          </div>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {!loading && displayedPosts < posts.length && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-[#1976D2] hover:bg-[#1976d2e2] text-white font-bold py-2 px-4 rounded"
            onClick={loadMorePosts}
          >
            Load More
          </button>
        </div>
      )}
      {lastLoadClicked && (
        <div className="flex justify-center mt-4">
          <p className="text-white text-2xl font-bold">
            You reached the end :)
          </p>
        </div>
      )}
    </div>
  );
};

export default Post;
