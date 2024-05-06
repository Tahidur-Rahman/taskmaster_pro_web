import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA8bnEm9JDmD0lE7yZthToQVvCcpFVCD7w",
    authDomain: "taskmaster-b63e6.firebaseapp.com",
    projectId: "taskmaster-b63e6",
    storageBucket: "taskmaster-b63e6.appspot.com",
    messagingSenderId: "996430604524",
    appId: "1:996430604524:web:b603a0045456b8057c5dc9",
    measurementId: "G-WDXPZ4D82Q",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
