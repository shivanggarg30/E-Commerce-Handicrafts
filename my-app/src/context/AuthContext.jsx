import React, { createContext, useState, useContext, useEffect } from 'react';
// import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"; // 🔥 Firebase Auth (commented)
// import { doc, getDoc } from "firebase/firestore"; // 🔥 Firestore (commented)
// import initializeFirebase from "../utils/FirebaseInit"; // 🔥 Firebase Init (commented)
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // const { auth, db } = initializeFirebase(); // 🚫 Firebase services (commented)

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 🔥 onAuthStateChanged (commented)
        /*
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                console.log("User is signed in:", user.uid);

                try {
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
                setUser(null);
                setUserRole(null);
                console.log("User is signed out");
            }
            setLoading(false);
        });

        return () => unsubscribe();
        */

        // Simulate guest user for frontend dev
        setTimeout(() => {
            setUser({ uid: "demoUser123", email: "demo@example.com" });
            setUserRole("seller");
            setLoading(false);
        }, 1000);
    }, []);

    const login = async (email, password) => {
        try {
            // 🔥 Firebase login (commented)
            /*
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const role = userData.role;
                setUserRole(role);

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
            */

            // Simulated login
            const user = { uid: "demoUser123", email };
            setUser(user);
            const role = email.includes("seller") ? "seller" : "user";
            setUserRole(role);

            if (role === "seller") {
                navigate("/seller/dashboard");
            } else {
                navigate("/");
            }

            return user;
        } catch (error) {
            console.error("Login error (simulated):", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // await signOut(auth); // 🔥 Firebase signOut (commented)

            // Simulate logout
            setUser(null);
            setUserRole(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout error (simulated):", error);
            throw error;
        }
    };

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


