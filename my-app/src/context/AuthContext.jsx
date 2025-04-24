import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';

// Create context
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();

        // Set up the onAuthStateChanged listener
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in.
                setUser(user);
                console.log("User is signed in:", user.uid);

                try {
                    // Get user role from Firestore
                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserRole(userData.role);
                        console.log("User role:", userData.role);
                    } else {
                        setUserRole(null);
                        console.log("No user document found");
                    }
                } catch (error) {
                    console.error("Error getting user role:", error);
                    setUserRole(null);
                }
            } else {
                // User is signed out.
                setUser(null);
                setUserRole(null);
                console.log("User is signed out");
            }
            setLoading(false);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch role from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const role = userData.role;
                
                // Set role in state
                setUserRole(role);
                
                // Navigate based on role
                if (role === "seller") {
                    navigate("/seller/dashboard");
                } else {
                    navigate("/");
                }
            } else {
                console.log("No user document found");
                navigate("/");
            }
            
            return user;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    };

    // The 'value' passed to the context provider
    const value = {
        user,
        loading,
        userRole,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
