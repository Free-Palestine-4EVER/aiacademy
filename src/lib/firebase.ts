import { initializeApp, getApps } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User as FirebaseUser,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwIBFiS9InufrlwF2iRTnCj42E3Q-nmis",
    authDomain: "aicourse-ebdda.firebaseapp.com",
    projectId: "aicourse-ebdda",
    storageBucket: "aicourse-ebdda.firebasestorage.app",
    messagingSenderId: "461042150724",
    appId: "1:461042150724:web:2311048440ba35a6b3bb11"
};

// Initialize Firebase (prevent re-initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export {
    app, auth, db, googleProvider,
    signInWithPopup, firebaseSignOut, onAuthStateChanged,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
};
export type { FirebaseUser };

// Firestore helpers
export const createUserDocument = async (
    uid: string,
    data: {
        email: string;
        name: string;
        phone?: string;
        requestedCourse: string;
        profile?: {
            computerSkill: string;
            englishLevel: string;
            learningGoal: string;
            timeCommitment: string;
            device: string;
        };
    }
) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
        ...data,
        createdAt: serverTimestamp(),
        isAdmin: false,
        courseAccess: [],
        paymentStatus: "pending",
        whatsappContacted: false,
    });
};

export const getUserDocument = async (uid: string) => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return { id: userSnap.id, ...userSnap.data() };
    }
    return null;
};

export const updateUserPayment = async (uid: string, courseAccess: string[]) => {
    try {
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, {
            courseAccess,
            paymentStatus: "paid",
        }, { merge: true });
        console.log("Payment updated for user:", uid, courseAccess);
    } catch (error) {
        console.error("Error updating payment:", error);
        throw error;
    }
};

export const getAllUsers = async () => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateUserProgress = async (uid: string, courseType: string, lessonId: string, completed: boolean) => {
    const progressRef = doc(db, "users", uid, "progress", `${courseType}_${lessonId}`);
    await setDoc(progressRef, {
        lessonId,
        courseType,
        completed,
        updatedAt: serverTimestamp(),
    });
};
