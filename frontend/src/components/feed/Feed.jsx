import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../utils/UserContext";
import { animated, useSpring } from "react-spring";

const Feed = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { user } = useUser();
  const limit = 10;

  const messageStyles = useSpring({
    opacity: errorMessage ? 1 : 0,
    transform: errorMessage
      ? "translate3d(0,0,0)"
      : "translate3d(-40px,0,-40px)",
  });

  useEffect(() => {
    const initialFetch = async () => {
      const initialItems = await fetchFeedItems(limit, offset);
      setFeedItems(initialItems);
    };
    setOffset(offset + limit);
    initialFetch();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [feedItems, offset]);

  const fetchFeedItems = async (limit, offset) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/feed?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching feed items:", error);
      return [];
    }
  };

  const loadMoreItems = async () => {
    // Fetch the next set of items from the backend
    const newItems = await fetchFeedItems(limit, offset);

    // Filter out duplicates
    const uniqueItems = [...new Set([...feedItems, ...newItems])];

    // Update the feed items and offset
    setFeedItems(uniqueItems);
    setOffset(offset + limit);
  };

  const fetchComments = async (feedItemId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/feed/comments/${feedItemId}`
      );
      setComments((prevComments) => ({
        ...prevComments,
        [feedItemId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const likeFeedItem = async (feedItemId, userId) => {
    try {
      const like = await axios.post(
        `http://localhost:3001/api/feed/like/${feedItemId}/${userId}/${user.id}`
      );

      const data = like.data;

      if (data.error) {
        setErrorMessage("You already liked this.");

        setTimeout(() => {
          setErrorMessage("");
        }, 3000);

        return;
      } else {
        const updatedFeedItems = feedItems.map((item) => {
          if (item.id === feedItemId) {
            return { ...item, likes: item.likes + 1 };
          }
          return item;
        });

        setFeedItems(updatedFeedItems);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const addComment = async (feedItemId, comment) => {
    try {
      const encodedComment = encodeURIComponent(comment);
      const like = await axios.post(
        `http://localhost:3001/api/feed/comment/${feedItemId}/${encodedComment}/${user.id}`
      );

      if (like.status === 200) {
        fetchComments(feedItemId);
      } else {
        setErrorMessage("Error adding comment.");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComments = (id) => {
    if (comments[id]) {
      setComments({ ...comments, [id]: null });
    } else {
      // Fetch and display comments (assuming you have a function to do this)
      fetchComments(id);
    }
  };

  return (
    <div className="feed-container">
      {feedItems.map((item) => (
        <div
          key={item.id}
          className="feed-item bg-white rounded-lg shadow-lg p-4 mb-4"
        >
          <div className="flex items-center mb-2">
            <img
              src={item.user.avatar}
              alt="User avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">{item.user.username}</span>
            <span className="text-gray-500 text-sm ml-auto">
              {new Date(item.timestamp.toString()).toLocaleString()}
            </span>
            <h3>{item.title}</h3>
          </div>
          <p className="text-gray-700 mb-2">{item.content}</p>
          {comments[item.id] && (
            <div className="comments-section border-t border-gray-300 mt-2 pt-2">
              {comments[item.id].map((comment) => (
                <div key={comment.id} className="border rounded p-2 my-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={comment.user.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="font-semibold">
                        {comment.user.username} said:
                      </span>
                      <span className="text-gray-700 ml-2">
                        {comment.content}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {new Date(comment.timestamp.toString()).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add a comment..."
                className="border rounded p-2 w-full mb-2"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white rounded p-2"
                onClick={() => addComment(item.id, newComment)}
              >
                Post Comment
              </button>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              className="text-blue-500"
              onClick={() => toggleComments(item.id)}
            >
              <i className="fa fa-comments text-2xl" title="Comments"></i>
            </button>
            <button
              className="text-green-500"
              disabled={errorMessage}
              onClick={() => likeFeedItem(item.id, item.userId)}
            >
              <i className="fa fa-thumbs-up mr-1 text-2xl" title="Like"></i>
              {item.likes}
            </button>
          </div>
        </div>
      ))}
      {errorMessage && (
        <animated.div
          style={messageStyles}
          className="bg-red-500 text-white inline-block px-2 py-1 rounded-lg"
        >
          {errorMessage}
        </animated.div>
      )}
    </div>
  );
};
export default Feed;
