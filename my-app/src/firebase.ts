import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC64zobP0sm9zN1a2JzYkBODywdOOc8IG4",
    authDomain: "wedding-7d53a.firebaseapp.com",
    projectId: "wedding-7d53a",
    storageBucket: "wedding-7d53a.appspot.com",
    messagingSenderId: "933577769905",
    appId: "1:933577769905:web:faf65db8e02891eb54f390",
    measurementId: "G-KJP7EWKWT8"
  };

(window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
const analytics = getAnalytics(app);