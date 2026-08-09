import { ref, set, get } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { db, DATA_PATH } from './firebase.js';

export const dbRegisterUser = async (username, password, bio) => {
    try {
        const userRef = ref(db, `${DATA_PATH}/users/${username.toLowerCase()}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) return { success: false, message: 'Username is taken.' };

        const userData = { username, password, bio, createdAt: Date.now() };
        await set(userRef, userData);
        return { success: true, user: userData };
    } catch (err) {
        console.error('Registration failed:', err.message);
        return { success: false, message: err.message };
    }
};

export const dbLoginUser = async (username, password) => {
    try {
        const snapshot = await get(ref(db, `${DATA_PATH}/users/${username.toLowerCase()}`));
        if (!snapshot.exists() || snapshot.val().password !== password) {
            return { success: false, message: 'Invalid Username or Password.' };
        }
        return { success: true, user: snapshot.val() };
    } catch (err) {
        console.error('Login failed:', err.message);
        return { success: false, message: err.message };
    }
};

export const dbGetUser = async (username) => {
    const snapshot = await get(ref(db, `${DATA_PATH}/users/${username.toLowerCase()}`));
    return snapshot.exists() ? snapshot.val() : null;
};

export const dbGetAllUsers = async () => {
    const snapshot = await get(ref(db, `${DATA_PATH}/users`));
    return snapshot.exists() ? snapshot.val() : {};
};