/**
 * Utility function to handle image URLs consistently across the application
 * Supports both external URLs (Unsplash, etc.) and local uploads
 */

import API_BASE_URL from '../config/api';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Clean the path (remove leading slash if present)
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // If it's an uploads path, use the uploads endpoint
  if (cleanPath.startsWith('uploads/')) {
    return `${API_BASE_URL}/${cleanPath}`;
  }
  
  // Otherwise, use the main API base URL
  return `${API_BASE_URL}/${cleanPath}`;
};

export const getUploadsUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Clean the path (remove leading slash if present)
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Always use the uploads endpoint
  return `${API_BASE_URL}/uploads/${cleanPath}`;
};

/**
 * Get image URL specifically for menu items
 */
export const getMenuImageUrl = (imagePath) => {
  return getImageUrl(imagePath, "/images/placeholder-menu.jpg");
};

/**
 * Handle image error by setting fallback
 */
export const handleImageError = (e, fallback = "/images/placeholder-food.jpg") => {
  e.target.src = fallback;
  e.target.onerror = null; // Prevent infinite loop
};

/**
 * Handle menu image error
 */
export const handleMenuImageError = (e) => {
  handleImageError(e, "/images/placeholder-menu.jpg");
};
