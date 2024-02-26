import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db, firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import { addDoc, arrayUnion, collection, getCountFromServer, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes, } from "firebase/storage";


initializeApp(firebaseConfig);
const auth = getAuth();


const getUserDocRef = async () => {
    let response = await authAPI.authMe();
    if (response.currentUser) {
        const { currentUser } = response;
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where('uid', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs[0].ref;
    }
    return null;
};

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
            name: null,
            city: null,
            services: null,
            aboutMe: null,
            contacts: null,
            portfolio: null,
            photo: null,
            pricing: null,
        });
    }
}


export const profileAPI = {
    async getProfile(userId) {
        let id = parseInt(userId);
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where('id', '==', id));
        const querySnapshot = await getDocs(q);
        let data = {};
        querySnapshot.forEach((doc) => {
            data = doc.data();
        });
        return data;
    },
    async saveProfile(profile, services) {
        const userDocRef = await getUserDocRef();
        if (userDocRef) {
            return setDoc(userDocRef, {
                name: profile.name,
                city: profile.city,
                services: services,
                aboutMe: profile.aboutMe,
                contacts: profile.contacts,
                link: profile.link
            }, { merge: true });
        }
    },
    async savePricelist(updatedPricelist) {
        const userDocRef = await getUserDocRef();
        if (userDocRef) {
            return setDoc(userDocRef, {
                pricing: updatedPricelist,
            }, { merge: true });
        }
    },
    async saveUserPhoto(photoFile, userId) {
        const userDocRef = await getUserDocRef();
        const storage = getStorage();
        const storageRef = ref(storage);
        const fileRef = ref(storageRef, `avatars/user_${userId}/${photoFile.name}`);
        try {
            this.deletePhoto();
            await uploadBytes(fileRef, photoFile);
            const url = await getDownloadURL(fileRef);
            if (userDocRef) {
                setDoc(userDocRef, {
                    photo: url,
                }, { merge: true });
            }
            return url;
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    },

    async deletePhoto() {
        let response = await authAPI.authMe();
        const userDocRef = await getUserDocRef();
        if (response.currentUser) {
            const { currentUser } = response;
            const usersCollectionRef = collection(db, 'users');
            const q = query(usersCollectionRef, where('uid', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const storage = getStorage();
                const fileURL = doc.data().photo;
                const fileRef = ref(storage, fileURL);
                try {
                    deleteObject(fileRef);
                    if (userDocRef) {
                        return setDoc(userDocRef, {
                            photo: null,
                        }, { merge: true });
                    }
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
            });
        }
    },

    async saveUserPortfolioPhoto(photoFile, userId) {
        const userDocRef = await getUserDocRef();
        const storage = getStorage();
        const storageRef = ref(storage);
        try {
            const urls = [];
            for (const file of photoFile) {
                const fileRef = ref(storageRef, `portfolio/user_${userId}/${file.name}`);
                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);
                urls.push(url);
            }
            if (userDocRef) {
                const userDoc = await getDoc(userDocRef);
                const currentPortfolio = userDoc.data().portfolio || [];
                const updatedPortfolio = [...currentPortfolio, ...urls];
                setDoc(userDocRef, {
                    portfolio: updatedPortfolio
                }, { merge: true });
            }
            return urls;

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    },

    async updateUserPortfolioPhoto(photoFile, userId) {
        const userDocRef = await getUserDocRef();
        const storage = getStorage();
        const storageRef = ref(storage);
        try {
            if (userDocRef) {
                const userDoc = await getDoc(userDocRef);
                setDoc(userDocRef, {
                    portfolio: photoFile
                }, { merge: true });
            }
        }

        catch (error) {
            console.error('Error uploading file:', error);
        }
    },
    async deletePortfolioPhoto(deletedImageUrl) {
        const storage = getStorage();
        const fileRef = ref(storage, deletedImageUrl);
        try {
            deleteObject(fileRef);
        }
        catch (error) {
            console.error('Error deleting file:', error);
        }
    }
}
