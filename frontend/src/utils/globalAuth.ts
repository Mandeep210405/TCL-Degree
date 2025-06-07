/**
 * Simple global authentication variables
 */

// Global variables for tracking login state
export let user_logged: boolean = false;
export let booth_logged: boolean = false;

// Function to set user logged in
export const setUserLoggedIn = (value: boolean) => {
  user_logged = value;
  // Also save to localStorage for persistence
  localStorage.setItem('user_logged', value ? 'true' : 'false');
};

// Function to set booth logged in
export const setBoothLoggedIn = (value: boolean) => {
  booth_logged = value;
  // Also save to localStorage for persistence
  localStorage.setItem('booth_logged', value ? 'true' : 'false');
};

// Function to check if any user is logged in
export const isLoggedIn = () => {
  return user_logged || booth_logged;
};

// Function to load the auth state from localStorage
export const loadAuthState = () => {
  const userLoggedStr = localStorage.getItem('user_logged');
  const boothLoggedStr = localStorage.getItem('booth_logged');
  
  user_logged = userLoggedStr === 'true';
  booth_logged = boothLoggedStr === 'true';
  
  return { user_logged, booth_logged };
};

// Initialize auth state from localStorage when this module loads
loadAuthState();

// Export an object with all functions and variables
export default {
  user_logged,
  booth_logged,
  setUserLoggedIn,
  setBoothLoggedIn,
  isLoggedIn,
  loadAuthState
}; 