import React, { useState } from "react";
import Comments from "./Comments";
import CommentIcon from "../../assets/comments.svg?react";
import UpVoteIcon from "../../assets/up.svg?react";
import DownVoteIcon from "../../assets/down.svg?react";

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
    <article className="flex flex-col bg-dark p-4 rounded-lg shadow-md text-light">
      <div className="ml-5 mr-5">
        <section className="flex items-center mt-2">
          <a
            href={post.url}
            className="text-zinc-300 leading-snug font-semibold break-words  hover:text-white"
          >
            {post.title}
          </a>
          {!imageUrl && !thumbnailUrl && (
            <p className="mt-2 text-gray-400 text-sm break-words">
              {post.selftext}
            </p>
          )}
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
              className="w-full h-auto mt-5 rounded"
            />
          </section>
        )}
        <div className="border-t border-gray-500 mt-5"></div>
        <footer className="flex items-center space-x-4 mt-5 text-gray-500">
          <h6 className="font-bold text-sm">{"u/" + post.author}</h6>
          <p className="text-gray-500 text-sm">{`Posted ${postTime}`}</p>
          <button
            onClick=""
            className="flex items-center space-x-2 py-1 px-2 shadow-md no-underline rounded-full bg-very-dark text-light border-blue btn-primary hover:bg-gray-700 focus:outline-none active:shadow-none"
          >
            <UpVoteIcon className="w-5 h-fit fill-light" />
            <span className="text-sm">Vote</span>
            <DownVoteIcon className="w-5 h-fit fill-light" />
          </button>
          <button
            onClick={handleToggleComments}
            className="flex items-center space-x-2 py-1 px-2 shadow-md no-underline rounded-full bg-very-dark text-light border-blue btn-primary hover:bg-gray-700 focus:outline-none active:shadow-none"
          >
            <CommentIcon className="w-6 h-fit fill-light" />
            <span className="text-sm">{post.num_comments}</span>
          </button>
        </footer>
        {showComments && (
          <Comments subredditName={subreddit.display_name} postId={post.id} />
        )}
      </div>
    </article>
  );
};

export default Card;
