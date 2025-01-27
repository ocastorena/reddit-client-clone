import React from "react";

const Card = ({ post, subredditIcon }) => {
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

  return (
    <article className="flex bg-dark p-4 rounded-lg shadow-md text-light ml-0">
      <div className="ml-5 mr-5 w-full">
        <header className="flex items-center space-x-4">
          <img
            src={subredditIcon}
            alt="Subreddit Icon"
            className="w-6 h-6 rounded-full"
          />
          <h4 className="font-bold">{post.subreddit_name_prefixed}</h4>
          <p className="text-gray-500">{`Posted ${postTime}`}</p>
        </header>
        <section className="flex items-center mt-2">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            {!imageUrl && !thumbnailUrl && (
              <p className="mt-2 text-gray-400 text-sm">{post.selftext}</p>
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
          <section>
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
          <p>comments</p>
          <p>share</p>
          <p>save</p>
          <p>...</p>
        </footer>
      </div>
    </article>
  );
};

export default Card;
