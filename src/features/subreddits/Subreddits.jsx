import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllSubreddits,
  selectAllSubreddits,
  isLoadingSubreddits,
} from "./subredditsSlice";

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectAllSubreddits);
  const isLoading = useSelector(isLoadingSubreddits);

  useEffect(() => {
    dispatch(loadAllSubreddits());
  }, [dispatch]);

  return (
    <aside className="bg-dark p-4 rounded-lg shadow-md text-light w-full">
      <h2 className="text-xl font-bold mb-4">Popular Subreddits</h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <ul className="space-y-2">
          {subreddits.map((subreddit) => (
            <li key={subreddit.id} className="hover:underline">
              <a
                href={`https://www.reddit.com${subreddit.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {subreddit.display_name_prefixed}
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Subreddits;
