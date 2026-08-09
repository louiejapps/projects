import { ref, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { db, DATA_PATH } from './firebase.js';

export const dbSubscribeNotifications = (username, callback) => {
    return onValue(ref(db, `${DATA_PATH}/notifications/${username.toLowerCase()}`), (snapshot) => {
        const data = snapshot.val() || {};
        callback(Object.entries(data).map(([id, val]) => ({ id, ...val })));
    });
};

export const dbClearNotification = async (username, notifId) => {
    await remove(ref(db, `${DATA_PATH}/notifications/${username.toLowerCase()}/${notifId}`));
};