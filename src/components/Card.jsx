import React from "react";

const Card = ({ redditPost }) => {
  return (
    <div className="flex bg-dark p-4 rounded-lg shadow-md text-light ml-0">
      <div className="flex-shrink-0 flex flex-col items-center">
        <div>votes</div>
      </div>
      <div className="ml-5 mr-5 w-full">
        <div className="flex items-center space-x-4">
          <h4 className="font-bold">subreddit name</h4>
          <p className="text-gray-500">posted 30 min ago</p>
        </div>
        <h3 className="text-xl font-semibold mt-2">Post Title</h3>
        <img
          src="https://placehold.co/400"
          alt="Post"
          className="w-full h-auto mt-2 rounded"
        />
        <div className="border-t border-gray-500 mt-5"></div>
        <div className="flex items-center space-x-4 mt-5 text-gray-500">
          <p>comments</p>
          <p>share</p>
          <p>save</p>
          <p>...</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
