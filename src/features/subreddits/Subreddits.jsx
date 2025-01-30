import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllSubreddits,
  selectAllSubreddits,
  isLoadingSubreddits,
  setCurrentSubreddit,
} from "./subredditsSlice";

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectAllSubreddits);
  const isLoading = useSelector(isLoadingSubreddits);

  useEffect(() => {
    dispatch(loadAllSubreddits());
  }, [dispatch]);

  return (
    <aside className="h-[87vh] overflow-y-auto bg-dark p-4 rounded-lg shadow-md text-light w-fit">
      <h2 className="text-xl font-bold mb-4">Popular Subreddits</h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <ul className="space-y-2">
          {subreddits.map((subreddit) => (
            <li key={subreddit.id} className="flex items-center">
              <img
                className="w-6 h-6 rounded-full bg-zinc-100"
                src={
                  subreddit.icon_img
                    ? subreddit.icon_img
                    : "/src/assets/letter-r.png"
                }
              />
              <button
                onClick={() => dispatch(setCurrentSubreddit(subreddit))}
                className="text-left w-full p-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-700 hover:scale-105 active:bg-gray-800 active:scale-95"
              >
                {subreddit.display_name_prefixed}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Subreddits;
