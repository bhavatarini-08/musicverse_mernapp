import React, { useState } from "react";
import { LogOut } from "lucide-react";
const Navbar = ({ onLogout }) => {
  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => {
    window.location.href = "/";
  };
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">MusicVerse</h1>
        <div className="relative">
          <LogOut
            className="cursor-pointer"
            onClick={() => setShowLogout(!showLogout)}
          />
          {showLogout && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;