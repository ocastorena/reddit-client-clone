import { configureStore } from "@reduxjs/toolkit";
import postsFeedReducer from "../features/postsFeed/postsFeedSlice";
import popularSubreddits from "../features/subreddits/subredditsSlice";

export default configureStore({
  reducer: {
    postsFeed: postsFeedReducer,
    popularSubreddits: popularSubreddits,
  },
});
