import React from "react";
import { createContext } from "react";
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
	updatePassword,
} from "firebase/auth";
import app from "../../firebase/firebase.config.js";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../pages/Shared/Loading/Loading.js";
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState("Home | OneByZero");

	const googleProvider = new GoogleAuthProvider();

	const providerLogin = (provider) => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};

	const handleGoogleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const updateUserProfile = (profile) => {
		return updateProfile(auth.currentUser, profile);
	};

	const updateUserPassword = (password) => {
		return updatePassword(auth.currentUser, password);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	useEffect(() => {
		document.title = title;
	}, [title]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setLoading(false);
			// console.log(currentUser);
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		setLoading,
		providerLogin,
		logOut,
		updateUserProfile,
		updateUserPassword,
		createUser,
		signIn,
		handleGoogleSignIn,
		setTitle,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
