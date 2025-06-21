// src/api/rooms.ts
export const fetchRooms = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/rooms");
      return await response.json();
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return [];
    }
  };
  