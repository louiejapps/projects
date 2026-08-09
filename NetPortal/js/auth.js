const SESSION_KEY = 'chan_session_user';

export const getSession = () => localStorage.getItem(SESSION_KEY);
export const setSession = (username) => localStorage.setItem(SESSION_KEY, username);
export const clearSession = () => localStorage.removeItem(SESSION_KEY);