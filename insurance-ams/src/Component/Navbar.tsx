"use client";
import Avatar from "react-avatar";
import { useState } from "react";
import { FaSearch, FaBell, FaCommentDots } from "react-icons/fa";

const Navbar = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="flex items-center justify-between h-12 px-6 bg-gray-100 shadow-md">
            {/* Search Bar */}
            <div className="relative w-80">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-1.5 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-2 text-gray-400" />
            </div>

            {/* Notification & Profile Section */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative cursor-pointer">
                    <FaBell className="text-gray-500 text-lg" />
                    <span className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-2">
                    <div className="text-right">
                        <p className="text-sm font-semibold">Waleed Aref</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                    <Avatar 
                        name="Waleed Aref" 
                        size="30" 
                        round={true} 
                        color="#6B46C1" 
                      />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
