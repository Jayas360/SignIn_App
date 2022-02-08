import { createContext, useContext, useState } from "react"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../Firebase-config";
import { useEffect } from "react/cjs/react.development";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState("");
  

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logOut() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe()
        }
    }, []);

    return (
        <userAuthContext.Provider value={{ user, signUp, logIn,logOut }} >
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext);
}