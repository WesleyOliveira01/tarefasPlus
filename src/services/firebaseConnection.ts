import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { get } from "http";

const firebaseConfig = {
  apiKey: "AIzaSyALUOCVQe5CPQjn7rzr7nP-a80KS2fHQnE",
  authDomain: "tarefasplus-eb4d0.firebaseapp.com",
  projectId: "tarefasplus-eb4d0",
  storageBucket: "tarefasplus-eb4d0.appspot.com",
  messagingSenderId: "392226500417",
  appId: "1:392226500417:web:e86ea0bffe70691e257bc0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
