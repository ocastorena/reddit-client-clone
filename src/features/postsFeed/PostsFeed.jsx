import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import {
  loadAllPosts,
  selectAllPosts,
  isLoadingPostsFeed,
} from "./postsFeedSlice";
import { selectCurrentSubreddit } from "../subreddits/subredditsSlice";

const PostsFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(isLoadingPostsFeed);
  const currentSubreddit = useSelector(selectCurrentSubreddit);

  useEffect(() => {
    dispatch(loadAllPosts(currentSubreddit.display_name));
  }, [dispatch, currentSubreddit]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-gray-500">No posts matching search term</p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {posts.map((post, index) => (
        <Card key={index} post={post} subreddit={currentSubreddit} />
      ))}
    </section>
  );
};

export default PostsFeed;
