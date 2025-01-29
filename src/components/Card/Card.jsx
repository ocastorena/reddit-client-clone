import React, { useState } from "react";
import Comments from "./Comments";
import commentIcon from "../../assets/comments.svg";
import "./Card.css";

const Card = ({ post, subreddit }) => {
  const [showComments, setShowComments] = useState(false);

  const imageUrl = post.preview?.images[0]?.source?.url.replace(/&amp;/g, "&");
  const thumbnailUrl =
    post.thumbnail && post.thumbnail.startsWith("http") ? post.thumbnail : null;

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

  const postTime = getRelativeTime(post.created_utc);

  const handleToggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  return (
    <article className="flex flex-col bg-dark p-4 rounded-lg shadow-md text-light ml-0 max-w-full overflow-hidden">
      <div className="ml-5 mr-5">
        <header className="flex items-center space-x-4">
          <h6 className="font-bold">{"u/" + post.author}</h6>
          <p className="text-gray-500">{`Posted ${postTime}`}</p>
        </header>
        <section className="flex items-center mt-2 max-w-full overflow-hidden">
          <div className="flex-grow max-w-full overflow-hidden">
            <h3 className="text-lg font-semibold break-words">{post.title}</h3>
            {!imageUrl && !thumbnailUrl && (
              <p className="mt-2 text-gray-400 text-sm break-words">
                {post.selftext}
              </p>
            )}
          </div>
          {!imageUrl && thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Thumbnail"
              className="w-20 h-20 ml-4 rounded"
            />
          )}
        </section>
        {imageUrl && (
          <section className="max-w-full overflow-hidden">
            <img
              src={imageUrl}
              alt="Post"
              className="w-full h-auto mt-2 rounded"
            />
          </section>
        )}
        <div className="border-t border-gray-500 mt-5"></div>
        <footer className="flex items-center space-x-4 mt-5 text-gray-500">
          <div>votes</div>
          <button
            onClick={handleToggleComments}
            className="flex items-center space-x-2 py-1 px-4 shadow-md no-underline rounded-full bg-very-dark text-light font-sans font-semibold text-sm border-blue btn-primary hover:bg-gray-700 focus:outline-none active:shadow-none mr-2"
          >
            <img
              src={commentIcon}
              alt="comments icon"
              className="w-6 h-6 filter-white"
            />
            <span>{post.num_comments}</span>
          </button>
          <p>share</p>
          <p>save</p>
          <p>...</p>
        </footer>
        {showComments && (
          <Comments subredditName={subreddit.display_name} postId={post.id} />
        )}
      </div>
    </article>
  );
};

export default Card;
