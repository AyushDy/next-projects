import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1PHS8VVdJ58Wp4C59bEIZSvZ6RFazai4",
  authDomain: "clone-c602c.firebaseapp.com",
  projectId: "clone-c602c",
  storageBucket: "clone-c602c.firebasestorage.app",
  messagingSenderId: "833677570834",
  appId: "1:833677570834:web:d03e9e3813258b4beb79cb",
  measurementId: "G-EYXKY8R4YM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };