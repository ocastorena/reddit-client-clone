import React from "react";

const Card = ({ redditPost }) => {
  return (
    <article className="flex bg-dark p-4 rounded-lg shadow-md text-light ml-0">
      <aside className="w-1/14 flex flex-col items-center">
        <div>votes</div>
      </aside>
      <div className="ml-5 mr-5 w-full">
        <header className="flex items-center space-x-4">
          <h4 className="font-bold">subreddit name</h4>
          <p className="text-gray-500">posted 30 min ago</p>
        </header>
        <section>
          <h3 className="text-xl font-semibold mt-2">Post Title</h3>
          <img
            src="https://placehold.co/400"
            alt="Post"
            className="w-full h-auto mt-2 rounded"
          />
        </section>
        <div className="border-t border-gray-500 mt-5"></div>
        <footer className="flex items-center space-x-4 mt-5 text-gray-500">
          <p>comments</p>
          <p>share</p>
          <p>save</p>
          <p>...</p>
        </footer>
      </div>
      <aside className="w-1/14"></aside>
    </article>
  );
};

export default Card;
