"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CourseType } from "@/lib/types";
import {
    auth,
    db,
    googleProvider,
    signInWithPopup,
    firebaseSignOut,
    onAuthStateChanged,
    createUserDocument,
    getUserDocument,
    FirebaseUser,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

// User type matching Firestore structure
interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    createdAt: Date;
    isAdmin: boolean;
    courseAccess: CourseType[];
    paymentStatus: "pending" | "paid";
    requestedCourse?: CourseType;
    whatsappContacted?: boolean;
    profile?: {
        computerSkill: string;
        englishLevel: string;
        learningGoal: string;
        timeCommitment: string;
        device: string;
    };
}

interface AuthContextType {
    user: User | null;
    firebaseUser: FirebaseUser | null;
    isLoading: boolean;
    isAdmin: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    createAdminAccount: (email: string, password: string, name: string) => Promise<void>;
    signOut: () => Promise<void>;
    registerWithEmail: (name: string, email: string, phone: string, courseType: CourseType, profile: User['profile']) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Listen to Firebase Auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
            setFirebaseUser(fbUser);

            if (fbUser) {
                // User is signed in, get their Firestore data
                const userData = await getUserDocument(fbUser.uid);
                if (userData) {
                    setUser(userData as User);
                }
            } else {
                setUser(null);
            }

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Real-time listener for user document changes
    useEffect(() => {
        if (!firebaseUser) return;

        const userRef = doc(db, "users", firebaseUser.uid);
        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                setUser({ id: doc.id, ...doc.data() } as User);
            }
        });

        return () => unsubscribe();
    }, [firebaseUser]);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const fbUser = result.user;

            const existingUser = await getUserDocument(fbUser.uid);

            if (!existingUser) {
                await createUserDocument(fbUser.uid, {
                    email: fbUser.email || "",
                    name: fbUser.displayName || "",
                    requestedCourse: "bundle",
                });
            }
        } catch (error) {
            console.error("Google sign in error:", error);
            throw error;
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const fbUser = result.user;

            // Get user document
            const userData = await getUserDocument(fbUser.uid);
            if (userData) {
                setUser(userData as User);
            }
        } catch (error) {
            console.error("Email sign in error:", error);
            throw error;
        }
    };

    const createAdminAccount = async (email: string, password: string, name: string) => {
        try {
            // Create Firebase Auth account
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const fbUser = result.user;

            // Create admin user document
            await createUserDocument(fbUser.uid, {
                email,
                name,
                requestedCourse: "bundle",
            });

            // Note: isAdmin needs to be set manually in Firestore Console or via Admin SDK
            // For security, we don't allow client-side admin creation
        } catch (error) {
            console.error("Create admin error:", error);
            throw error;
        }
    };

    const registerWithEmail = async (
        name: string,
        email: string,
        phone: string,
        courseType: CourseType,
        profile: User['profile']
    ) => {
        try {
            const uid = email.replace(/[^a-zA-Z0-9]/g, "_");

            await createUserDocument(uid, {
                email,
                name,
                phone,
                requestedCourse: courseType,
                profile,
            });

            localStorage.setItem("ai_course_user_id", uid);

            const userData = await getUserDocument(uid);
            if (userData) {
                setUser(userData as User);
            }
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            localStorage.removeItem("ai_course_user_id");
            setUser(null);
            setFirebaseUser(null);
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    // Check localStorage for email-based session on mount
    useEffect(() => {
        const checkLocalSession = async () => {
            const storedUserId = localStorage.getItem("ai_course_user_id");
            if (storedUserId && !firebaseUser) {
                const userData = await getUserDocument(storedUserId);
                if (userData) {
                    setUser(userData as User);
                }
            }
            setIsLoading(false);
        };

        checkLocalSession();
    }, [firebaseUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                firebaseUser,
                isLoading,
                isAdmin: user?.isAdmin || false,
                signInWithGoogle,
                signInWithEmail,
                createAdminAccount,
                signOut,
                registerWithEmail,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
