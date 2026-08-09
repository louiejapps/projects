import { ref, set, get, push, remove } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { db, DATA_PATH } from './firebase.js';

export const dbSendFriendRequest = async (fromUser, toUser) => {
    try {
        const reqRef = ref(db, `${DATA_PATH}/friendRequests/${toUser.toLowerCase()}/${fromUser.toLowerCase()}`);
        await set(reqRef, { from: fromUser, timestamp: Date.now() });

        await push(ref(db, `${DATA_PATH}/notifications/${toUser.toLowerCase()}`), {
            type: 'request',
            from: fromUser,
            text: `${fromUser} sent you a friend request.`,
            timestamp: Date.now()
        });
    } catch (err) {
        console.error('Friend request failed:', err.message);
    }
};

export const dbAcceptFriendRequest = async (user, requester) => {
    try {
        await set(ref(db, `${DATA_PATH}/friends/${user.toLowerCase()}/${requester.toLowerCase()}`), true);
        await set(ref(db, `${DATA_PATH}/friends/${requester.toLowerCase()}/${user.toLowerCase()}`), true);
        await remove(ref(db, `${DATA_PATH}/friendRequests/${user.toLowerCase()}/${requester.toLowerCase()}`));

        await push(ref(db, `${DATA_PATH}/notifications/${requester.toLowerCase()}`), {
            type: 'accept',
            from: user,
            text: `${user} accepted your friend request.`,
            timestamp: Date.now()
        });
    } catch (err) {
        console.error('Accept request failed:', err.message);
    }
};

export const dbDeclineFriendRequest = async (user, requester) => {
    await remove(ref(db, `${DATA_PATH}/friendRequests/${user.toLowerCase()}/${requester.toLowerCase()}`));
};

export const dbUnfriendUser = async (user1, user2) => {
    try {
        const u1 = user1.toLowerCase();
        const u2 = user2.toLowerCase();
        await remove(ref(db, `${DATA_PATH}/friends/${u1}/${u2}`));
        await remove(ref(db, `${DATA_PATH}/friends/${u2}/${u1}`));
        return { success: true };
    } catch (err) {
        console.error('Unfriend failed:', err.message);
        return { success: false, error: err };
    }
};

export const dbGetFriends = async (username) => {
    const snapshot = await get(ref(db, `${DATA_PATH}/friends/${username.toLowerCase()}`));
    return snapshot.exists() ? Object.keys(snapshot.val()) : [];
};

export const dbGetFriendRequests = async (username) => {
    const snapshot = await get(ref(db, `${DATA_PATH}/friendRequests/${username.toLowerCase()}`));
    return snapshot.exists() ? snapshot.val() : {};
};

export const dbGetOutgoingRequests = async (username) => {
    const snapshot = await get(ref(db, `${DATA_PATH}/friendRequests`));
    if (!snapshot.exists()) return [];

    const allRequests = snapshot.val();
    const userLower = username.toLowerCase();

    return Object.keys(allRequests).filter(targetUser =>
        allRequests[targetUser] && allRequests[targetUser][userLower]
    );
};