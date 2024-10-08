import React from "react";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-bold text-white mb-6">
          Welcome to <span className="text-purple-400">MusicVerse</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Your personal music sanctuary. Create playlists, discover new tracks,
          and join live listening parties.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Get Started
          </button>
          {/* <button
            onClick={() => navigate("/admin")}
            className="px-8 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Admin Login
          </button> */}
        </div>
      </div>
    </div>
  );
};
export default LandingPage;