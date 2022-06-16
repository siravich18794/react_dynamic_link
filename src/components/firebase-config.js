import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZgCDUe4L--X1YzfgeK7WM5t_tRXpP0zE",
  authDomain: "intern-project-6402d.firebaseapp.com",
  projectId: "intern-project-6402d",
  storageBucket: "intern-project-6402d.appspot.com",
  messagingSenderId: "516169294989",
  appId: "1:516169294989:web:65c12454ff2b30de43eec4",
  measurementId: "G-G4SGKEJBVB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
