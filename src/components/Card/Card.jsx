import React, { useState } from "react";
import Comments from "./Comments";
import CommentIcon from "../../assets/comments.svg?react";
import UpVoteIcon from "../../assets/up.svg?react";
import DownVoteIcon from "../../assets/down.svg?react";
import { formatNumber } from "../../utils/formatNumber";

const Card = ({ post, subreddit }) => {
  const [showComments, setShowComments] = useState(false);
  const [voteCount, setVoteCount] = useState(post.ups + post.downs);
  const [voteStatus, setVoteStatus] = useState(null);

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

  const handleUpvote = () => {
    if (voteStatus === "upvoted") {
      setVoteCount((prevVoteCount) => prevVoteCount - 1);
      setVoteStatus(null);
    } else {
      setVoteCount(
        (prevVoteCount) => prevVoteCount + (voteStatus === "downvoted" ? 2 : 1)
      );
      setVoteStatus("upvoted");
    }
  };

  const handleDownvote = () => {
    if (voteStatus === "downvoted") {
      setVoteCount((prevVoteCount) => prevVoteCount + 1);
      setVoteStatus(null);
    } else {
      setVoteCount(
        (prevVoteCount) => prevVoteCount - (voteStatus === "upvoted" ? 2 : 1)
      );
      setVoteStatus("downvoted");
    }
  };

  return (
    <article className="flex flex-col bg-dark p-4 rounded-lg shadow-md text-light max-w-xl">
      <div className="ml-5 mr-5">
        <header className="flex items-center space-x-2">
          <h6 className="md:text-[1.1vh] text-xs">{"u/" + post.author}</h6>
          <span className="text-zinc-500">•</span>
          <p className="md:text-[1.1vh] text-xs leading-none text-zinc-500">{`Posted ${postTime}`}</p>
        </header>
        {!imageUrl && !thumbnailUrl && (
          <div>
            <h2 className="mt-2 mb-2">
              <a
                href={post.url}
                className="text-zinc-300 md:text-[1.4vh] text-base font-semibold break-words hover:text-white"
              >
                {post.title}
              </a>
            </h2>
            <p className="mt-2 text-gray-400 md:text-[1.2vh] text-sm break-words">
              {post.selftext}
            </p>
          </div>
        )}
        {!imageUrl && thumbnailUrl && (
          <section className="flex mt-2 max-w-full items-center">
            <h2 className="my-2 mr-2">
              <a
                href={post.url}
                className="text-zinc-300 md:text-[1.4vh] text-base font-semibold break-words hover:text-white"
              >
                {post.title}
              </a>
            </h2>
            <img
              src={thumbnailUrl}
              alt="Thumbnail"
              className="w-[6vh] h-[6vh] ml-auto rounded"
            />
          </section>
        )}
        {imageUrl && (
          <section className="max-w-full overflow-hidden">
            <h2 className="mt-2 mb-2">
              <a
                href={post.url}
                className="text-zinc-300 md:text-lg text-base font-semibold break-words hover:text-white"
              >
                {post.title}
              </a>
            </h2>
            <img
              src={imageUrl}
              alt="Post"
              className="w-full h-auto mt-5 rounded"
            />
          </section>
        )}
        <div className="border-t-2 border-zinc-700 mt-5"></div>
        <footer className="flex items-center space-x-4 mt-5 text-gray-500">
          <div className="flex items-center shadow-md no-underline rounded-full bg-very-dark">
            <button
              onClick={handleUpvote}
              className={`flex items-center space-x-2 py-1 px-2 shadow-md no-underline rounded-full bg-very-dark text-light border-blue btn-primary hover:bg-gray-700 focus:outline-none active:shadow-none ${voteStatus === "upvoted" ? "text-green-500" : ""}`}
            >
              <UpVoteIcon
                className={`w-[1.5vh] h-fit fill-current ${voteStatus === "upvoted" ? "text-green-500" : ""}`}
              />
            </button>
            <span
              className={`text-[1.2vh] px-1 ${voteStatus === "upvoted" ? "text-green-500" : voteStatus === "downvoted" ? "text-red-500" : "text-zinc-200"}`}
            >
              {formatNumber(voteCount)}
            </span>
            <button
              onClick={handleDownvote}
              className={`flex items-center space-x-2 py-1 px-2 shadow-md no-underline rounded-full bg-very-dark text-light border-blue btn-primary hover:bg-gray-700 focus:outline-none active:shadow-none ${voteStatus === "downvoted" ? "text-red-500" : ""}`}
            >
              <DownVoteIcon
                className={`w-[1.5vh] h-fit fill-current ${voteStatus === "downvoted" ? "text-red-500" : ""}`}
              />
            </button>
          </div>
          <button
            onClick={handleToggleComments}
            className="flex items-center space-x-2 py-1 px-2 shadow-md no-underline rounded-full bg-very-dark text-light border-blue btn-primary hover:bg-gray-700 focus:outline-none active:shadow-none"
          >
            <CommentIcon className="w-[2vh] h-fit fill-light" />
            <span className="text-[1.2vh]">
              {formatNumber(post.num_comments)}
            </span>
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
