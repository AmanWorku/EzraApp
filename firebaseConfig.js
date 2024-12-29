import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDXwVjlIURgnX7KCghv71y2Llt_JUgIKSQ',
  authDomain: 'ezra-seminary-ffc4e.firebaseapp.com',
  projectId: 'ezra-seminary-ffc4e',
  storageBucket: 'ezra-seminary-ffc4e.appspot.com', // Fix storage bucket URL
  messagingSenderId: '1096965053624',
  appId: '1:1096965053624:ios:6d1113f7b5387036fb284d',
};

// Initialize Firebase once

const appStart = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

export {appStart, auth, firestore, storage};
