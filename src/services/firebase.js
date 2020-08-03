import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: "todo-app-react-b593f",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "210990876020",
  appId: process.env.FIREBASE_APP_ID,
});

const db = firebaseApp.firestore();

export { db };
