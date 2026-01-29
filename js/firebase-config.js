import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyDXiN3JckHVjz1rw1bUI1A4JP5wJ5bhUgU",
  authDomain: "fatnessve-7ef1a.firebaseapp.com",
  projectId: "fatnessve-7ef1a",
  storageBucket: "fatnessve-7ef1a.appspot.com",
  messagingSenderId: "725515899680",
  appId: "1:725515899680:web:8dd7f386c911fd3dc93d45",
  measurementId: "G-HJFC994CMB"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
