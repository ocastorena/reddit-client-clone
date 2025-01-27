import { configureStore } from "@reduxjs/toolkit";
import postsFeedReducer from "../features/postsFeed/postsFeedSlice";

export default configureStore({
  reducer: {
    postsFeed: postsFeedReducer,
  },
});
