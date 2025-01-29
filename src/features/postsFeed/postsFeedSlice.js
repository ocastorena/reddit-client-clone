import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchComments } from "../../utils/api";

export const loadAllPosts = createAsyncThunk(
  "postsFeed/loadAllPosts",
  async (subreddit, thunkAPI) => {
    try {
      const posts = await fetchPosts(subreddit);
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadComments = createAsyncThunk(
  "postsFeed/loadComments",
  async ({ subredditName, postId }, thunkAPI) => {
    try {
      const comments = await fetchComments(subredditName, postId);
      return comments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const postsFeedSlice = createSlice({
  name: "postsFeed",
  initialState: {
    posts: {
      posts: [],
      filteredPosts: [],
      isLoadingPostsFeed: false,
      hasError: false,
    },
    comments: {
      comments: {
        comments: [],
        isLoadingComments: false,
        hasError: false,
      },
    },
  },
  reducers: {
    setFilteredPosts: (state, action) => {
      state.posts.filteredPosts = state.posts.posts.filter((post) =>
        post.title.toLowerCase().includes(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllPosts.pending, (state) => {
        state.posts.isLoadingPostsFeed = true;
        state.posts.hasError = false;
      })
      .addCase(loadAllPosts.fulfilled, (state, action) => {
        state.posts.isLoadingPostsFeed = false;
        state.posts.posts = action.payload;
        state.posts.filteredPosts = action.payload;
      })
      .addCase(loadAllPosts.rejected, (state) => {
        state.posts.isLoadingPostsFeed = false;
        state.posts.hasError = true;
      })
      .addCase(loadComments.pending, (state) => {
        state.comments.isLoadingComments = true;
        state.comments.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.comments.isLoadingComments = false;
        state.comments.comments = action.payload;
      })
      .addCase(loadComments.rejected, (state) => {
        state.comments.isLoadingComments = false;
        state.comments.hasError = true;
      });
  },
});

export const { setFilteredPosts } = postsFeedSlice.actions;

export const selectAllPosts = (state) => state.postsFeed.posts.filteredPosts;
export const isLoadingPostsFeed = (state) =>
  state.postsFeed.posts.isLoadingPostsFeed;

export const selectComments = (state) => state.postsFeed.comments.comments;
export const isLoadingComments = (state) =>
  state.postsFeed.comments.isLoadingComments;

export default postsFeedSlice.reducer;
