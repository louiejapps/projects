import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyB2_2WWRNMyojBKFfRL2RXiir3rgZVCRhA",
    authDomain: "fidel-f8814.firebaseapp.com",
    databaseURL: "https://fidel-f8814-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fidel-f8814",
    storageBucket: "fidel-f8814.appspot.com",
    messagingSenderId: "709483654742",
    appId: "1:709483654742:web:a05299c807bfed6e1815f7"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const DATA_PATH = 'data';