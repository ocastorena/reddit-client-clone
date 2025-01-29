import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectComments,
  loadComments,
  isLoadingComments,
} from "../../features/postsFeed/postsFeedSlice";

const Comments = ({ subredditName, postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const isLoading = useSelector(isLoadingComments);

  useEffect(() => {
    dispatch(loadComments({ subredditName, postId }));
  }, [dispatch]);

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp * 1000);
    const secondsAgo = Math.floor((now - postDate) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(secondsAgo / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval !== 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  return (
    <section className="max-w-full overflow-hidden">
      {isLoading ? (
        <div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-2 border-b border-gray-200">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <article
            key={comment.id}
            className="p-2 border-b border-gray-500 max-w-full overflow-hidden"
          >
            <header className="flex items-center space-x-2 mb-1">
              <span className="text-xs text-gray-400">u/{comment.author}</span>
              <time className="text-xs text-gray-400">
                {getRelativeTime(comment.created_utc)}
              </time>
            </header>
            <p className="text-sm text-light break-words">{comment.body}</p>
          </article>
        ))
      ) : (
        <p className="text-gray-500">No comments available.</p>
      )}
    </section>
  );
};

export default Comments;
