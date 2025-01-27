import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularSubreddits } from "../../utils/api";

export const loadAllSubreddits = createAsyncThunk(
  "popularSubreddits",
  async (thunkAPI) => {
    try {
      const subreddits = await fetchPopularSubreddits();
      console.log(subreddits);
      return subreddits;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const subredditsSlice = createSlice({
  name: "popularSubreddits",
  initialState: {
    currentSubreddit: {
      display_name: "all",
    },
    subreddits: [],
    isLoadingSubreddits: false,
    hasError: false,
  },
  reducers: {
    setCurrentSubreddit: (state, action) => {
      state.currentSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllSubreddits.pending, (state) => {
        state.isLoadingSubreddits = true;
        state.hasError = false;
      })
      .addCase(loadAllSubreddits.fulfilled, (state, action) => {
        state.isLoadingSubreddits = false;
        state.hasError = false;
        state.subreddits = action.payload;
      })
      .addCase(loadAllSubreddits.rejected, (state, action) => {
        state.isLoadingSubreddits = false;
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

export default subredditsSlice.reducer;
