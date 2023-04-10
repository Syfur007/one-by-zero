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
	const [activeUser, setActiveUser] = useState(true);
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

	// TODO:: UPDATE EXPIRE TIME FOR ACTIVE USER
	const updateExpireTime = () => {
		const expireTime = Date.now() + 10000;

		localStorage.setItem("one-by-zero-edu-expire-time", expireTime);
	};

	// TODO:: CHANGE TITLE
	useEffect(() => {
		document.title = title;
	}, [title]);
	// TODO:: CHECK WHETHER USER LOGGED IN OR NOT
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

	// TODO:: update ACTIVE user time
	useEffect(() => {
		updateExpireTime();
		window.addEventListener("keydown", updateExpireTime);
		window.addEventListener("scroll", updateExpireTime);
		window.addEventListener("click", updateExpireTime);
		window.addEventListener("keypress", updateExpireTime);
		window.addEventListener("keyup", updateExpireTime);
		window.addEventListener("touchmove", updateExpireTime);
		window.addEventListener("mousemove", updateExpireTime);
		window.addEventListener("mouseup", updateExpireTime);
		window.addEventListener("mousedown", updateExpireTime);
		window.addEventListener("mouseleave", updateExpireTime);
		window.addEventListener("mouseover", updateExpireTime);
		window.addEventListener("mouseenter", updateExpireTime);

		return () => {
			window.removeEventListener("keydown", updateExpireTime);
			window.removeEventListener("scroll", updateExpireTime);
			window.removeEventListener("click", updateExpireTime);
			window.removeEventListener("keypress", updateExpireTime);
			window.removeEventListener("keyup", updateExpireTime);
			window.removeEventListener("touchmove", updateExpireTime);
			window.removeEventListener("mousemove", updateExpireTime);
			window.removeEventListener("mouseup", updateExpireTime);
			window.removeEventListener("mousedown", updateExpireTime);
			window.removeEventListener("mouseleave", updateExpireTime);
			window.removeEventListener("mouseover", updateExpireTime);
			window.removeEventListener("mouseenter", updateExpireTime);
		};
	});
	// TODO:CHECK FUNCTION FOR USER
	const checkActive = () => {
		const expireTime = localStorage.getItem("one-by-zero-edu-expire-time");
		if (expireTime < Date.now()) {
			setActiveUser(false);
		} else {
			setActiveUser(true);
		}
	};
	// TODO:: CHECK TIME EVERY FIVE SECOND
	useEffect(() => {
		const interval = setInterval(() => {
			checkActive();
		}, 5000);
		return () => clearInterval(interval);
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
		activeUser,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
