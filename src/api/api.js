import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db, firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import { Firestore, addDoc, collection, getCountFromServer, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

initializeApp(firebaseConfig);
const auth = getAuth();



export const authAPI = {
    authMe() {
        return getAuth();
    },
    login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)

    },
    logout() {
        return signOut(auth);
    },
    async registrate(email, password) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        const coll = collection(db, "users");
        const snapshot = await getCountFromServer(coll);
        const docRef = addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
            id: snapshot.data().count + 1,
        });
    }
}