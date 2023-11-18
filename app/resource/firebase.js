// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxGPKGbtNgVlY_eLeOphbVee823OErwCY",
  authDomain: "runeat-5e7ba.firebaseapp.com",
  projectId: "runeat-5e7ba",
  storageBucket: "runeat-5e7ba.appspot.com",
  messagingSenderId: "367454599368",
  appId: "1:367454599368:web:db1f48d9f73b214c93cdfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()

// export 