import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { app, db, firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import { Query, addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, runTransaction, setDoc, startAt, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, } from "firebase/storage";



initializeApp(firebaseConfig);
const auth = getAuth(app, {
    experimentalAutoDetectLongPolling: true,
    experimentalForceLongPolling: true
});

const storage = getStorage();
const storageRef = ref(storage);

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
        return signInWithEmailAndPassword(auth, email, password);
    },
    logout() {
        return signOut(auth);
    },

    async registrate(email, password) {
        try {
            await runTransaction(db, async (transaction) => {
                const usersCounterRef = collection(db, 'usersIdCounter');
                const counterRef = doc(usersCounterRef, 'counter');
                const counterSnapshot = await transaction.get(counterRef);
                const counterData = counterSnapshot.data();
                const newUserId = counterData.UsersIdCounter + 1;
                transaction.update(counterRef, {
                    UsersIdCounter: newUserId,
                });
                const docRef = addDoc(collection(db, "users"), {
                    id: newUserId,
                    createdAt: new Date(),
                });
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user;
                const usersCollectionRef = collection(db, 'users');
                const q = query(usersCollectionRef, where('id', '==', newUserId));
                const querySnapshot = await getDocs(q);
                const userDocRef = querySnapshot.docs[0].ref;
                if (userDocRef) {
                    await updateDoc(userDocRef, {
                        uid: user.uid,
                        email: user.email,
                        id: newUserId,
                        name: null,
                        city: null,
                        services: null,
                        aboutMe: null,
                        contacts: null,
                        portfolio: null,
                        photo: null,
                        pricing: null,
                        createdAt: new Date(),
                    }, { merge: true });
                }
            });
            return true;
        }
        catch (error) {
            console.log(error);
        }
    },
    async resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }
}

const usersCollectionRef = collection(db, 'users');
const all = query(usersCollectionRef, orderBy('createdAt'));

export const usersAPI = {
    async getUsersTotalCount() {
        const q = query(usersCollectionRef);
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            let userData = doc.data();
            data.push(userData)
        });
        return data;

    },
    async getUsers(currentPage = 1, pageSize = 5) {
        try {
            const querySnapshot = await getDocs(all);
            let data = [];
            let index = 0;
            querySnapshot.forEach((doc) => {
                if (index >= (currentPage - 1) * pageSize && index < currentPage * pageSize) {
                    let userData = doc.data();
                    userData.createdAt = userData.createdAt.toDate().toISOString();
                    data.push(userData)
                }
                index++;
            });
            return data;
        }
        catch (error) {
            console.log(error);
        }
    },
    async getUsersWithPagination(pageNumber, pageSize = 5) {
        const documentSnapshots = await getDocs(all);
        const lastVisible = documentSnapshots.docs[(pageSize * pageNumber) - pageSize];
        const next = query(usersCollectionRef, orderBy('createdAt'), startAt(lastVisible), limit(pageSize));
        const querySnapshot = await getDocs(next);
        let data = [];
        querySnapshot.forEach(doc => {
            let userData = doc.data();
            userData.createdAt = userData.createdAt.toDate().toISOString();
            data.push(userData);
        });
        return data;

    },

    async getQuerySearchUsers(querySearch, currentPage = 1, pageSize = 5) {
        try {
            const queryServices = query(usersCollectionRef, where('services', 'array-contains', querySearch));
            const queryCity = query(usersCollectionRef, where('city', '==', querySearch));
            const [querySnapshotServices, querySnapshotCity] = await Promise.all([getDocs(queryServices), getDocs(queryCity)]);
            let data = [];
            querySnapshotCity.forEach((doc) => {
                let userData = doc.data();
                userData.createdAt = userData.createdAt.toDate().toISOString();
                data.push(userData);
            });
            querySnapshotServices.forEach((doc) => {
                let userData = doc.data();
                userData.createdAt = userData.createdAt.toDate().toISOString();
                data.push(userData);
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    },
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
            data.createdAt = data.createdAt.toDate().toISOString();
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
        const fileRef = ref(storage, deletedImageUrl);
        try {
            deleteObject(fileRef);
        }
        catch (error) {
            console.error('Error deleting file:', error);
        }
    }
}

export const postsAPI = {
    async createPost(newPost, photoFile) {
        try {
            const postsCounterRef = collection(db, 'postsIdCounter');
            const counterRef = doc(postsCounterRef, 'counter');

            const result = await runTransaction(db, async (transaction) => {
                const counterSnapshot = await transaction.get(counterRef);
                const counterData = counterSnapshot.data();
                const newPostId = counterData.PostsIdCounter + 1;
                transaction.update(counterRef, {
                    PostsIdCounter: newPostId,
                });

                const urls = [];
                for (const file of photoFile) {
                    const fileRef = ref(storageRef, `posts/post_${newPostId}/${file.name}`);
                    await uploadBytes(fileRef, file);
                    const url = await getDownloadURL(fileRef);
                    urls.push(url);
                }
                const docRef = addDoc(collection(db, "posts"), {
                    title: newPost.title,
                    text: newPost.text,
                    author: newPost.author,
                    authorPhoto: newPost.authorPhoto,
                    authorService: newPost.authorService,
                    authorId: newPost.authorId,
                    id: newPostId,
                    pictures: urls,
                    likes: 0,
                    likedBy: [],
                    createdAt: newPost.createdAt,
                    comments: [],
                    commentsCounter: 0
                });

                return true;
            });

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async getPostsTotalCount(category, userId) {
        try {
            const postsCollectionRef = collection(db, 'posts');
            let q;
            if (!category) {
                q = query(postsCollectionRef);
            } else if (category === 'MyPosts') {
                q = query(postsCollectionRef, where('authorId', '==', userId));
            } else {
                q = query(postsCollectionRef, where('authorService', 'array-contains-any', [category]));
            }
            const querySnapshot = await getDocs(q);
            let data = querySnapshot.docs.map(doc => doc.data());
            return data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getPostsWithPagination(pageNumber, pageSize = 3, category, userId = null) {
        let queryRef;
        const postsCollectionRef = collection(db, 'posts');
        if (!category) {
            queryRef = query(postsCollectionRef, orderBy('id', 'desc'));
        } else if (category === 'MyPosts') {
            queryRef = query(postsCollectionRef, where('authorId', '==', userId), orderBy('id', 'desc'));
        } else {
            queryRef = query(postsCollectionRef, where('authorService', 'array-contains-any', [category]), orderBy('id', 'desc'));
        }
        const documentSnapshots = await getDocs(queryRef);
        const lastVisible = documentSnapshots.docs[(pageSize * pageNumber) - pageSize];
        const nextQueryRef = query(postsCollectionRef, ...(category === 'MyPosts'
            ? [where('authorId', '==', userId)]
            : (category
                ? [where('authorService', 'array-contains-any', [category])]
                : [])), orderBy('id', 'desc'), startAt(lastVisible), limit(pageSize));
        const querySnapshot = await getDocs(nextQueryRef);
        return querySnapshot.docs.map(doc => doc.data());
    },
    async addLike(userId, postId) {
        const postsCollectionRef = collection(db, 'posts');
        const q = query(postsCollectionRef, where('id', '==', postId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
            const docRef = querySnapshot.docs[0].ref;
            const postData = querySnapshot.docs[0].data()
            if (postData.likedBy.includes(userId)) {
                const updatedLikeCount = postData.likes - 1;
                const updatedLikedBy = postData.likedBy.filter(id => id !== userId);
                return setDoc(docRef, {
                    likes: updatedLikeCount,
                    likedBy: updatedLikedBy
                }, { merge: true });
            } else {
                const updatedLikeCount = postData.likes + 1;
                const updatedLikedBy = [...postData.likedBy, userId];
                return setDoc(docRef, {
                    likes: updatedLikeCount,
                    likedBy: updatedLikedBy
                }, { merge: true });
            }
        }
    },


    async addComment(userId, userName, postId, value) {

        const postsCollectionRef = collection(db, 'posts');
        const q = query(postsCollectionRef, where('id', '==', postId));
        try {
            const docRef = await getDocs(q);
            await runTransaction(db, async (transaction) => {
                const postDoc = docRef.docs[0];
                const postDocRef = docRef.docs[0].ref;
                const postData = postDoc.data();
                const newCommentId = postData.commentsCounter + 1;
                const newComment = {
                    id: newCommentId,
                    authorId: userId,
                    author: userName,
                    text: value,
                }
                const updatedComments = [...postData.comments, newComment];
                await updateDoc(postDocRef, {
                    commentsCounter: newCommentId,
                    comments: updatedComments
                }, { merge: true });
            });
            return true;
        } catch (error) {
            console.error("Error adding comment: ", error);
            return "Error adding comment.";
        }

    },

    async getPosts(currentPage = 1, pageSize = 3, category, userId) {
        try {
            const postsCollectionRef = collection(db, 'posts');
            let q;
            if (!category) {
                q = query(postsCollectionRef, orderBy('id', 'desc'));
            } else if (category === 'MyPosts') {
                q = query(postsCollectionRef, where('authorId', '==', userId), orderBy('id', 'desc'));
            } else {
                q = query(postsCollectionRef, where('authorService', 'array-contains', category), orderBy('id', 'desc'));
            }
            const querySnapshot = await getDocs(q);
            let data = [];
            let index = 0;
            querySnapshot.forEach((doc) => {
                if (index >= (currentPage - 1) * pageSize && index < currentPage * pageSize) {
                    let postData = doc.data();
                    data.push(postData);
                }
                index++;
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    async deletePost(postId, deletedImageUrl) {
        const postsCollectionRef = collection(db, 'posts');
        const q = query(postsCollectionRef, where('id', '==', postId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
            const docRef = querySnapshot.docs[0].ref;
            await deleteDoc(docRef);
        }
        const promises = deletedImageUrl.map(async (imageUrl) => {
            const fileRef = ref(storage, imageUrl);
            try {
                await deleteObject(fileRef);
            } catch (error) {
                console.error('Error deleting file:', error);
            }
        });
        await Promise.all(promises);
        return true;
    }
}