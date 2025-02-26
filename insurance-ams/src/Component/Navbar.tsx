"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
    const [search, setSearch] = useState("");
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      
      {/* Modern Search Bar */}
      <div className="relative flex-1 mx-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
    </div>
  );
};

export default Navbar;
