import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularSubreddits } from "../../utils/api";

export const loadAllSubreddits = createAsyncThunk(
  "popularSubreddits",
  async (thunkAPI) => {
    try {
      const subreddits = await fetchPopularSubreddits();
      return subreddits;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const subredditsSlice = createSlice({
  name: "popularSubreddits",
  initialState: {
    subreddits: [],
    isLoadingSubreddits: false,
    hasError: false,
  },
  reducer: {},
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

export const selectAllSubreddits = (state) =>
  state.popularSubreddits.subreddits;

export const isLoadingSubreddits = (state) =>
  state.popularSubreddits.isLoadingSubreddits;

export default subredditsSlice.reducer;
