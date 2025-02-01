import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSubreddits,
  selectAllSubreddits,
  isLoadingSubreddits,
  setCurrentSubreddit,
  selectCurrentSubreddit,
} from "./subredditsSlice";
import defaultSubredditUrl from "../../assets/letter-r.png";

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectAllSubreddits);
  const isLoading = useSelector(isLoadingSubreddits);
  const currentSubreddit = useSelector(selectCurrentSubreddit);

  useEffect(() => {
    if (Object.keys(currentSubreddit).length === 0) {
      dispatch(loadSubreddits());
    }
  }, []);

  return (
    <>
      <h2 className="text-lg text-zinc-100 font-bold mb-4 p-2">
        Popular Subreddits
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <ul className="overflow-y-auto">
          {subreddits.map((subreddit) => (
            <li key={subreddit.id}>
              <button
                onClick={() => dispatch(setCurrentSubreddit(subreddit))}
                className="flex items-center text-zinc-300 text-sm text-left w-full break-words p-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-700 hover:scale-105 active:bg-gray-800 active:scale-95"
              >
                <img
                  className="w-6 h-6 rounded-full bg-zinc-100"
                  src={
                    subreddit.icon_img
                      ? subreddit.icon_img
                      : defaultSubredditUrl
                  }
                />
                <span className="p-2">{subreddit.display_name_prefixed}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Subreddits;
