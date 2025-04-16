import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Adicionamos o GoogleAuthProvider e signInWithPopup
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBgNJ8OWgw0CFlMDZaSxE9AJeGOGTt9vO4",
  authDomain: "controlefinanceiro-f94e1.firebaseapp.com",
  projectId: "controlefinanceiro-f94e1",
  storageBucket: "controlefinanceiro-f94e1.firebasestorage.app",
  messagingSenderId: "358489465831",
  appId: "1:358489465831:web:17ba1bf1b9e95f99c7d342",
  measurementId: "G-NY3RGB2H7Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("Usuário logado com Google: ", user);
    })
    .catch((error) => {
      console.error("Erro ao fazer login com Google", error);
    });
};

export { auth, signInWithGoogle };
