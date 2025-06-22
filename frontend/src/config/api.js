// API Base URL - fallback to Railway if not provided
// This handles both REACT_APP_API_URL and REACT_APP_API_BASE_URL for backward compatibility
const API_BASE_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_BASE_URL || 'https://web-production-3f45.up.railway.app';

// All API endpoints as named export
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  GOOGLE_AUTH: `${API_BASE_URL}/api/auth/google`,

  // User
  USER_PROFILE: `${API_BASE_URL}/api/user/profile`,
  USER_BY_ID: (id) => `${API_BASE_URL}/api/user/${id}`,

  // Rooms
  ROOMS: `${API_BASE_URL}/api/rooms`,
  ROOM_AVAILABILITY: `${API_BASE_URL}/api/rooms/availability`,
  ROOM_INTERACTIONS: `${API_BASE_URL}/api/rooms/interactions`,
  ROOM_RECOMMENDATIONS: (userId) => `${API_BASE_URL}/api/rooms/recommendations/${userId}`,
  POPULAR_ROOMS: `${API_BASE_URL}/api/rooms/popular`,

  // Tables
  TABLES: `${API_BASE_URL}/api/tables`,
  TABLE_AVAILABILITY: `${API_BASE_URL}/api/tables/availability`,
  TABLE_RECOMMENDATIONS: `${API_BASE_URL}/api/tables/recommendations`,

  // Bookings
  BOOKINGS: `${API_BASE_URL}/api/bookings`,
  USER_BOOKINGS: `${API_BASE_URL}/api/bookings/user`,
  BOOKING_BY_ID: (id) => `${API_BASE_URL}/api/bookings/${id}`,

  // Reservations
  RESERVATIONS: `${API_BASE_URL}/api/reservations`,
  RESERVATION_BY_ID: (id) => `${API_BASE_URL}/api/reservations/${id}`,
  TRACK_RESERVATION: `${API_BASE_URL}/api/tables/track-reservation`,

  // Menus
  MENUS: `${API_BASE_URL}/api/menus`,
  MENU_BY_CATEGORY: (category) => `${API_BASE_URL}/api/menus/category/${category}`,
  MENU_BY_ID: (id) => `${API_BASE_URL}/api/menus/${id}`,

  // Orders
  ORDERS: `${API_BASE_URL}/api/orders`,
  ORDER_BY_ID: (id) => `${API_BASE_URL}/api/orders/${id}`,
  ORDER_STATUS: (id) => `${API_BASE_URL}/api/orders/${id}/status`,

  // Cart
  CART: `${API_BASE_URL}/api/cart`,

  // Staff
  STAFF: `${API_BASE_URL}/api/staff`,
  STAFF_BY_ID: (id) => `${API_BASE_URL}/api/staff/${id}`,
  ADD_STAFF: `${API_BASE_URL}/api/staff/add`,

  // Shifts
  SHIFTS: `${API_BASE_URL}/api/shift`,
  ADD_SHIFT: `${API_BASE_URL}/api/shift/add`,
  SHIFT_BY_ID: (id) => `${API_BASE_URL}/api/shift/${id}`,
  TOGGLE_SHIFT: (id) => `${API_BASE_URL}/api/shift/${id}/toggle`,

  // Admin
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  ADMIN_USER_BY_ID: (id) => `${API_BASE_URL}/api/admin/users/${id}`,
  ADMIN_TOGGLE_USER: (id) => `${API_BASE_URL}/api/admin/users/${id}/toggle-status`,
  ADMIN_ANALYTICS: `${API_BASE_URL}/api/admin/dashboard/analytics`,
  ADMIN_ROOM_ML_ACCURACY: `${API_BASE_URL}/api/rooms/ml/accuracy`,
  ADMIN_ROOM_ML_CONFUSION: `${API_BASE_URL}/api/rooms/ml/confusion-matrix`,
  ADMIN_ROOM_ML_STATUS: `${API_BASE_URL}/api/rooms/ml/status`,

  // Uploads
  UPLOADS: `${API_BASE_URL}/uploads`,

  // Health
  HEALTH: `${API_BASE_URL}/api/health`,
  STATUS: `${API_BASE_URL}/api/status`,
};

// Named export for destructuring
export { API_BASE_URL };

// Default export for direct usage
export default API_BASE_URL;
