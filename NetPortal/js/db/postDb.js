import { ref, set, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { db, DATA_PATH } from './firebase.js';

export const dbCreatePost = async (author, recipient, content) => {
    try {
        const newRef = push(ref(db, `${DATA_PATH}/posts`));
        await set(newRef, {
            id: newRef.key,
            numericId: Math.floor(100000 + Math.random() * 900000),
            author, recipient, content,
            timestamp: Date.now()
        });
        return { success: true };
    } catch (err) {
        console.error('Create post failed:', err.message);
        return { success: false, error: err };
    }
};

export const dbAddReply = async (postId, author, content) => {
    try {
        const repliesRef = ref(db, `${DATA_PATH}/posts/${postId}/replies`);
        const newRef = push(repliesRef);
        await set(newRef, {
            id: newRef.key,
            author, content,
            timestamp: Date.now()
        });
        return { success: true };
    } catch (err) {
        console.error('Add reply failed:', err.message);
        return { success: false, error: err };
    }
};

export const dbDeletePost = async (postId) => {
    try {
        await remove(ref(db, `${DATA_PATH}/posts/${postId}`));
        return { success: true };
    } catch (err) {
        console.error('Delete post failed:', err.message);
        return { success: false, error: err };
    }
};

export const dbDeleteReply = async (postId, replyId) => {
    try {
        await remove(ref(db, `${DATA_PATH}/posts/${postId}/replies/${replyId}`));
        return { success: true };
    } catch (err) {
        console.error('Delete reply failed:', err.message);
        return { success: false, error: err };
    }
};

export const dbSubscribePosts = (callback) => {
    return onValue(ref(db, `${DATA_PATH}/posts`), (snapshot) => {
        const data = snapshot.val() || {};
        const array = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
        callback(array);
    });
};