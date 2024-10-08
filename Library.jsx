import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/playlists`);
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setError('Failed to fetch playlists. Please try again later.');
    }
  };

  const handleSongPlay = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Music Library</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div key={playlist._id} className="bg-purple-900 rounded-lg shadow-md p-4 text-white">
            <h2 className="text-xl font-semibold mb-4">{playlist.name}</h2>
            <ul>
              {playlist.songs && playlist.songs.map((song) => (
                <li 
                  key={song._id}
                  className="flex justify-between items-center py-2 hover:bg-gray-900 cursor-pointer rounded px-2"
                  onClick={() => handleSongPlay(song)}
                >
                  <span>{song.title}</span>
                  <span className="text-white">{song.artist}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
          <AudioPlayer
            autoPlay
            src={currentSong.url}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            showSkipControls={false}
            showJumpControls={false}
            header={`Now Playing: ${currentSong.title} - ${currentSong.artist}`}
          />
        </div>
      )}
    </div>
  );
};

export default Library;