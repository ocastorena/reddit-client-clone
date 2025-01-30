import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularSubreddits, fetchSubredditDetails } from "../../utils/api";

export const loadSubreddits = createAsyncThunk(
  "popularSubreddits/loadSubreddits",
  async (thunkAPI) => {
    try {
      const subreddits = await fetchPopularSubreddits();
      return subreddits;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadCurrentSubredditDetails = createAsyncThunk(
  "popularSubreddits/loadCurrentSubredditDetails",
  async (subredditName, thunkAPI) => {
    try {
      const subredditDetails = await fetchSubredditDetails(subredditName);
      return subredditDetails;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const subredditsSlice = createSlice({
  name: "popularSubreddits",
  initialState: {
    currentSubreddit: {},
    subreddits: [],
    isLoadingSubreddits: false,
    hasError: false,
    subredditDetails: {},
    isLoadingSubredditDetails: false,
  },
  reducers: {
    setCurrentSubreddit: (state, action) => {
      state.currentSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSubreddits.pending, (state) => {
        state.isLoadingSubreddits = true;
        state.hasError = false;
      })
      .addCase(loadSubreddits.fulfilled, (state, action) => {
        state.isLoadingSubreddits = false;
        state.hasError = false;
        state.subreddits = action.payload;
        state.currentSubreddit = action.payload[0];
      })
      .addCase(loadSubreddits.rejected, (state) => {
        state.isLoadingSubreddits = false;
        state.hasError = true;
      })
      .addCase(loadCurrentSubredditDetails.pending, (state) => {
        state.isLoadingSubredditDetails = true;
        state.hasError = false;
      })
      .addCase(loadCurrentSubredditDetails.fulfilled, (state, action) => {
        state.isLoadingSubredditDetails = false;
        state.hasError = false;
        state.subredditDetails = action.payload;
      })
      .addCase(loadCurrentSubredditDetails.rejected, (state) => {
        state.isLoadingSubredditDetails = false;
        state.hasError = true;
      });
  },
});

export const { setCurrentSubreddit } = subredditsSlice.actions;

export const selectAllSubreddits = (state) =>
  state.popularSubreddits.subreddits;

export const isLoadingSubreddits = (state) =>
  state.popularSubreddits.isLoadingSubreddits;

export const selectCurrentSubreddit = (state) =>
  state.popularSubreddits.currentSubreddit;

export const selectSubredditDetails = (state) =>
  state.popularSubreddits.subredditDetails;

export default subredditsSlice.reducer;
