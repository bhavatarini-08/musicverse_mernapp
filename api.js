import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllSongs = async () => {
  const response = await axios.get(`${API_URL}/songs`);
  return response.data;
};

export const addSong = async (song) => {
  const response = await axios.post(`${API_URL}/songs`, song);
  return response.data;
};

export const deleteSong = async (id) => {
  await axios.delete(`${API_URL}/songs/${id}`);
};