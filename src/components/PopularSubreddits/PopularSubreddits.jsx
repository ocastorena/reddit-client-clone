import React from "react";

const PopularSubreddits = ({ subreddits }) => {
  return (
    <aside className="bg-dark p-4 rounded-lg shadow-md text-light w-full">
      <h2 className="text-xl font-bold mb-4">Popular Subreddits</h2>
      <ul className="space-y-2">
        {subreddits.map((subreddit, index) => (
          <li key={index} className="hover:underline">
            <a
              href={`https://www.reddit.com/r/${subreddit}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              r/{subreddit}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default PopularSubreddits;
