"use client";

import Avatar from "react-avatar";
import { useState, useEffect } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<{ id: string; Fname: string; Lname: string }[]>([]);
  const router = useRouter();

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients");
        const data = await res.json();
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };

    fetchClients();
  }, []);

  // Search matching clients
  const matchedClients = clients.filter((client) =>
    `${client.Fname} ${client.Lname}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex items-center justify-between h-12 px-6 bg-gray-100 shadow-md relative">
      {/* Search Bar */}
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Search clients..."
          className="w-full px-4 py-1.5 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-2 text-gray-400" />

        {/* 🔥 Live Search Dropdown */}
        {search.length > 0 && (
          <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-60 overflow-y-auto">
            {matchedClients.length > 0 ? (
              matchedClients.map((client) => (
                <div
                  key={client.id}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                  onClick={() => {
                    router.push(`/clients/${client.id}`);
                    setSearch("");
                  }}
                >
                  {client.Fname} {client.Lname}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No clients found.</div>
            )}
          </div>
        )}
      </div>

      {/* Notification & Profile Section */}
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-500 text-lg" />
          <span className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
        </div>

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
