import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import {
  loadAllPosts,
  selectAllPosts,
  isLoadingPostsFeed,
} from "./postsFeedSlice";

const PostsFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(isLoadingPostsFeed);

  useEffect(() => {
    dispatch(loadAllPosts("all"));
  }, [dispatch]);

  return (
    <section className="space-y-4">
      {posts.map((post, index) => (
        <Card key={index} post={post} />
      ))}
    </section>
  );
};

export default PostsFeed;
