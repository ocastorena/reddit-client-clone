import React from "react";

const Navbar = () => {
  return (
    <header className="bg-dark p-4">
      <nav className="grid grid-cols-3 items-center">
        <div className="flex items-center">
          <img src="src/assets/react.svg" alt="logo" className="h-8 w-8 mr-2" />
          <span className="text-light text-xl font-bold">Reddit Clone</span>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search Reddit"
            className="w-full max-w-md p-2 rounded bg-light-dark text-light placeholder-light"
          />
        </div>
        <div className="flex justify-end">
          {/* Add any additional elements here, like user profile or settings icon */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
