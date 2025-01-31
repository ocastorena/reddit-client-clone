import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilteredPosts } from "../../features/postsFeed/postsFeedSlice";
// Components
import Sidebar from "../Sidebar/Sidebar";
import Subreddits from "../../features/subreddits/Subreddits";
// SVGs
import MenuIcon from "../../assets/comments.svg?react";
import RedditIcon from "../../assets/reddit.svg";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilteredPosts(searchTerm));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-dark">
      <div className="flex justify-between md:grid md:grid-cols-3 items-center">
        <div className="flex items-center">
          <img src={RedditIcon} alt="reddit-lite" className="h-8 w-8 mr-2" />
          <span className="text-light text-[2vh] font-bold">Reddit</span>
          <span className="text-orange-400 text-[2vh]">Lite</span>
        </div>
        <div className="hidden md:flex justify-center">
          <form onSubmit={handleFormSubmit} className="w-full">
            <input
              type="text"
              placeholder="Search Reddit"
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-light-dark text-zinc-100 placeholder-zinc-100 text-[1.5vh]"
            />
          </form>
        </div>
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          <MenuIcon className="w-10 h-10 fill-zinc-300" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-dark p-4 rounded-lg shadow-md">
          <Sidebar />
          <Subreddits />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
