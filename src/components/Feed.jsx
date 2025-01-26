import React from "react";
import Card from "./Card";

const Feed = ({ posts }) => {
  return (
    <section className="space-y-4">
      {posts.map((post, index) => (
        <Card key={index} redditPost={post} />
      ))}
    </section>
  );
};

export default Feed;
