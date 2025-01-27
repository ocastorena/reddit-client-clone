import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../../utils/api";

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

const postsFeedSlice = createSlice({
  name: "postsFeed",
  initialState: {
    posts: [],
    isLoadingPostsFeed: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllPosts.pending, (state) => {
        state.isLoadingPostsFeed = true;
        state.hasError = false;
      })
      .addCase(loadAllPosts.fulfilled, (state, action) => {
        state.isLoadingPostsFeed = false;
        state.posts = action.payload;
      })
      .addCase(loadAllPosts.rejected, (state) => {
        state.isLoadingPostsFeed = false;
        state.hasError = true;
      });
  },
});

export const selectAllPosts = (state) => state.postsFeed.posts;
export const isLoadingPostsFeed = (state) => state.postsFeed.isLoadingPostsFeed;

export default postsFeedSlice.reducer;
