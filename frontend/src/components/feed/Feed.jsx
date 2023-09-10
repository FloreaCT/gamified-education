import React, { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const limit = 10;

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

  const likeFeedItem = async (feedItemId) => {
    try {
      await axios.post(`http://localhost:3001/api/feed/like/${feedItemId}`);
      // Update the UI here to reflect the new like count
    } catch (error) {
      console.error("Error liking feed item:", error);
    }
  };

  const addComment = (feedItemId, comment) => {
    console.log(`Adding comment to feed item ${feedItemId}: ${comment}`);
    // Here you would send a request to your backend to actually add the comment
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
                  <span className="font-semibold">
                    {comment.user.username}:
                  </span>
                  <span className="text-gray-700 ml-2">{comment.content}</span>
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
              onClick={() => likeFeedItem(item.id)}
            >
              <i className="fa fa-thumbs-up mr-1 text-2xl" title="Like"></i>
              {item.likes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Feed;
