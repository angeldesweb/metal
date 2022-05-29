// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , enableIndexedDbPersistence , initializeFirestore, CACHE_SIZE_UNLIMITED} from 'firebase/firestore';
import { getAuth , signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALiHZ5lqLgft2Q8V4Pq1CC30uReEpfouA",
  authDomain: "metal-api1.firebaseapp.com",
  projectId: "metal-api1",
  storageBucket: "metal-api1.appspot.com",
  messagingSenderId: "210552257642",
  appId: "1:210552257642:web:43f89769767587fd7d9e13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app,{cacheSizeBytes:CACHE_SIZE_UNLIMITED});
//export const db = getFirestore(firestoreDB);
enableIndexedDbPersistence(db).catch(err => alert(err.message));
export const auth = getAuth();
export const logOut = () => signOut(auth);
