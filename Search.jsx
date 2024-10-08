// import { Search as SearchIcon } from 'lucide-react';

// const Search = () => {
//   const genres = [
//     'Rock', 'Pop', 'Hip Hop', 'Jazz', 'Classical', 'Electronic',
//     'R&B', 'Country', 'Blues', 'Folk', 'Metal', 'Reggae'
//   ];

//   return (
//     <div className="p-6">
//       <div className="relative mb-8">
//         <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//         <input
//           type="text"
//           placeholder="What do you want to listen to?"
//           className="w-full py-3 pl-12 pr-4 bg-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:bg-white/20"
//         />
//       </div>

//       <h2 className="text-2xl font-bold text-white mb-4">Browse All</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
//         {genres.map((genre, index) => (
//           <div
//             key={index}
//             className="aspect-square relative overflow-hidden rounded-lg cursor-pointer"
//             style={{
//               backgroundColor: hsl(${index * 30}, 70%, 50%),
//             }}
//           >
//             <span className="absolute inset-4 text-xl font-bold text-white">{genre}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Search;

import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { getAllSongs } from '../services/api';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getAllSongs();
        setSongs(data);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const results = songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSongs(results);
  }, [searchTerm, songs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6">
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for songs or artists"
          className="w-full py-3 pl-12 pr-4 bg-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:bg-white/20"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {searchTerm && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-white mb-4">Search Results</h2>
          {filteredSongs.length > 0 ? (
            <ul className="bg-gray-800 rounded-lg overflow-hidden">
              {filteredSongs.map((song, index) => (
                <li
                  key={song._id}
                  className={`flex items-center justify-between p-4 ${
                    index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'
                  } hover:bg-gray-600 transition-colors`}
                >
                  <div>
                    <h3 className="font-semibold text-white">{song.title}</h3>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                  <span className="text-gray-400">{song.duration}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No songs found</p>
          )}
        </div>
      )}

      {!searchTerm && (
        <>
          <h2 className="text-2xl font-bold text-white mb-4">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {['Rock', 'Pop', 'Hip Hop', 'Jazz', 'Classical', 'Electronic', 'R&B', 'Country', 'Blues', 'Folk', 'Metal', 'Reggae'].map((genre, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded-lg cursor-pointer"
                style={{ backgroundColor: `hsl(${index * 30}, 70%, 50%)` }}

              >
                <span className="absolute inset-4 text-xl font-bold text-white">{genre}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;