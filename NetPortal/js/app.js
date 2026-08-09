import { getSession, setSession, clearSession } from './auth.js';
import {
    dbRegisterUser, dbLoginUser, dbGetUser, dbGetAllUsers,
    dbSendFriendRequest, dbAcceptFriendRequest, dbDeclineFriendRequest, dbGetFriends, dbGetFriendRequests, dbGetOutgoingRequests, dbUnfriendUser,
    dbCreatePost, dbAddReply, dbDeletePost, dbDeleteReply, dbSubscribePosts, dbSubscribeNotifications, dbClearNotification
} from './db/index.js';

import { FeedView } from './components/FeedView.js';
import { ProfileView } from './components/ProfileView.js';
import { DirectoryView } from './components/DirectoryView.js';
import { NotificationsView } from './components/NotificationsView.js';
import { DeveloperView } from './components/DeveloperView.js';

let state = {
    user: getSession(),
    currentView: 'feed',
    activeProfile: null,
    directorySearch: '',
    posts: [],
    notifications: [],
    friendRequests: {}
};

// DOM Elements
const authView = document.getElementById('auth-view');
const appView = document.getElementById('app-view');
const navArea = document.getElementById('nav-area');
const alertBox = document.getElementById('alert-box');
const viewContent = document.getElementById('view-content');
const notifCountEl = document.getElementById('notif-count');

const showAlert = (msg) => {
    alertBox.textContent = msg;
    alertBox.classList.remove('hidden');
};
const hideAlert = () => alertBox.classList.add('hidden');

// Router
const navigate = async (view, params = {}) => {
    state.currentView = view;
    hideAlert();

    if (!state.user) {
        authView.classList.remove('hidden');
        appView.classList.add('hidden');
        navArea.classList.add('hidden');
        return;
    }

    authView.classList.add('hidden');
    appView.classList.remove('hidden');
    navArea.classList.remove('hidden');

    if (view === 'feed') {
        const friends = await dbGetFriends(state.user);
        const allowed = [state.user.toLowerCase(), ...friends];
        const feedPosts = state.posts.filter(p =>
            allowed.includes(p.author.toLowerCase()) ||
            allowed.includes(p.recipient.toLowerCase())
        );

        viewContent.innerHTML = FeedView(feedPosts, state.user);

        document.getElementById('feed-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const text = document.getElementById('feed-input').value;
            await dbCreatePost(state.user, state.user, text);
        });

    } else if (view === 'profile') {
        const target = params.username || state.user;
        state.activeProfile = target;

        const user = await dbGetUser(target);
        if (!user) {
            viewContent.innerHTML = 'User record not found.';
            return;
        }

        const friends = await dbGetFriends(target);
        const myFriends = await dbGetFriends(state.user);
        const myRequests = await dbGetFriendRequests(target);

        const isSelf = target.toLowerCase() === state.user.toLowerCase();
        const isFriend = myFriends.includes(target.toLowerCase());
        const isPending = !!myRequests[state.user.toLowerCase()];

        const userPosts = state.posts.filter(p => p.recipient.toLowerCase() === target.toLowerCase());

        viewContent.innerHTML = ProfileView(user, friends, isSelf, isFriend, isPending, userPosts, state.user);

        const boardForm = document.getElementById('board-form');
        if (boardForm) {
            boardForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const text = document.getElementById('board-input').value;
                await dbCreatePost(state.user, target, text);
            });
        }

        const sendReqBtn = document.getElementById('send-req-btn');
        if (sendReqBtn) {
            sendReqBtn.addEventListener('click', async () => {
                await dbSendFriendRequest(state.user, target);
                navigate('profile', { username: target });
            });
        }

    } else if (view === 'directory') {
        await renderDirectoryPage();
    } else if (view === 'notifications') {
        viewContent.innerHTML = NotificationsView(state.notifications, state.friendRequests);
    } else if (view === 'developer') {
        viewContent.innerHTML = DeveloperView();
    }
};

const renderDirectoryPage = async () => {
    const allUsers = await dbGetAllUsers();
    const myFriends = await dbGetFriends(state.user);
    const outgoingRequests = await dbGetOutgoingRequests(state.user);

    viewContent.innerHTML = DirectoryView(
        allUsers, myFriends, outgoingRequests, state.user, state.directorySearch
    );

    const searchInput = document.getElementById('directory-search');
    if (searchInput) {
        searchInput.focus();
        searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
        searchInput.addEventListener('input', (e) => {
            state.directorySearch = e.target.value;
            renderDirectoryPage();
        });
    }
};

// Global Click Delegates
document.addEventListener('click', async (e) => {
    const target = e.target;

    if (target.classList.contains('user-link')) {
        e.preventDefault();
        navigate('profile', { username: target.dataset.user });
    }

    if (target.classList.contains('reply-toggle')) {
        const postId = target.dataset.postid;
        const box = document.getElementById(`reply-box-${postId}`);
        if (box) box.classList.toggle('hidden');
    }

    if (target.classList.contains('delete-post-btn')) {
        e.preventDefault();
        const postId = target.dataset.postid;
        if (confirm('Delete this post?')) {
            await dbDeletePost(postId);
        }
    }

    if (target.classList.contains('delete-reply-btn')) {
        e.preventDefault();
        const postId = target.dataset.postid;
        const replyKey = target.dataset.replykey;
        if (confirm('Delete this reply?')) {
            await dbDeleteReply(postId, replyKey);
        }
    }

    if (target.classList.contains('send-req-dir-btn')) {
        const user = target.dataset.user;
        await dbSendFriendRequest(state.user, user);
        renderDirectoryPage();
    }

    if (target.id === 'unfriend-btn') {
        e.preventDefault();
        const targetUser = target.dataset.user;
        if (confirm(`Remove ${targetUser} from your friends?`)) {
            await dbUnfriendUser(state.user, targetUser);
            navigate('profile', { username: targetUser });
        }
    }

    if (target.classList.contains('unfriend-dir-btn')) {
        e.preventDefault();
        const targetUser = target.dataset.user;
        if (confirm(`Remove ${targetUser} from your friends?`)) {
            await dbUnfriendUser(state.user, targetUser);
            renderDirectoryPage();
        }
    }

    if (target.classList.contains('accept-req-btn')) {
        e.preventDefault();
        await dbAcceptFriendRequest(state.user, target.dataset.user);
        state.friendRequests = await dbGetFriendRequests(state.user);
        navigate('notifications');
    }

    if (target.classList.contains('decline-req-btn')) {
        e.preventDefault();
        await dbDeclineFriendRequest(state.user, target.dataset.user);
        state.friendRequests = await dbGetFriendRequests(state.user);
        navigate('notifications');
    }

    if (target.classList.contains('dismiss-notif-btn')) {
        e.preventDefault();
        await dbClearNotification(state.user, target.dataset.id);
    }
});

// Reply Form Submission
document.addEventListener('submit', async (e) => {
    if (e.target && e.target.classList.contains('reply-form')) {
        e.preventDefault();
        const postId = e.target.dataset.postid;
        const input = e.target.querySelector('.reply-input');
        const content = input ? input.value.trim() : '';

        if (postId && content && state.user) {
            const result = await dbAddReply(postId, state.user, content);
            if (result.success) {
                input.value = '';
            } else {
                showAlert('Failed to post reply.');
            }
        }
    }
});

// Navigation Links
document.getElementById('nav-feed').addEventListener('click', () => navigate('feed'));
document.getElementById('nav-profile').addEventListener('click', () => navigate('profile', { username: state.user }));
document.getElementById('nav-directory').addEventListener('click', () => {
    state.directorySearch = '';
    navigate('directory');
});
document.getElementById('nav-notifs').addEventListener('click', () => navigate('notifications'));
document.getElementById('nav-dev').addEventListener('click', () => navigate('developer'));
document.getElementById('nav-logout').addEventListener('click', () => {
    clearSession();
    state.user = null;
    navigate('feed');
});

// Auth Handlers
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await dbLoginUser(
        document.getElementById('login-user').value,
        document.getElementById('login-pass').value
    );
    if (res.success) {
        setSession(res.user.username);
        state.user = res.user.username;
        initRealtimeListeners();
        navigate('feed');
    } else {
        showAlert(res.message);
    }
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await dbRegisterUser(
        document.getElementById('reg-user').value,
        document.getElementById('reg-pass').value,
        document.getElementById('reg-bio').value
    );
    if (res.success) {
        setSession(res.user.username);
        state.user = res.user.username;
        initRealtimeListeners();
        navigate('feed');
    } else {
        showAlert(res.message);
    }
});

// Realtime Firebase Listeners
const initRealtimeListeners = () => {
    if (!state.user) return;

    dbSubscribeNotifications(state.user, async (notifs) => {
        state.notifications = notifs;
        state.friendRequests = await dbGetFriendRequests(state.user);

        const count = notifs.length + Object.keys(state.friendRequests).length;
        notifCountEl.textContent = count;

        if (state.currentView === 'notifications') {
            navigate('notifications');
        }
    });
};

dbSubscribePosts((posts) => {
    state.posts = posts;
    if (state.user) {
        navigate(state.currentView, { username: state.activeProfile });
    }
});

// Start Application
if (state.user) initRealtimeListeners();
navigate('feed');