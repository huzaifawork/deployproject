// src/api/rooms.ts
// Use the same environment variable as in your config and provide fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://web-production-3f45.up.railway.app';

export const fetchRooms = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/rooms");
      return await response.json();
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return [];
    }
  };
  