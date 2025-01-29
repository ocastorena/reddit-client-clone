import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilteredPosts } from "../../features/postsFeed/postsFeedSlice";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilteredPosts(searchTerm));
  };

  return (
    <nav className="grid grid-cols-3 items-center">
      <div className="flex items-center">
        <img src="src/assets/react.svg" alt="logo" className="h-8 w-8 mr-2" />
        <span className="text-light text-xl font-bold">Reddit Clone</span>
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleFormSubmit} className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search Reddit"
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-light-dark text-light placeholder-light"
          />
        </form>
      </div>
      <div className="flex justify-end">
        {/* Add any additional elements here, like user profile or settings icon */}
      </div>
    </nav>
  );
};

export default Navbar;
