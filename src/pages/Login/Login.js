import React, { useContext, useEffect } from "react";
import Left from "./Left";
import Right from "./Right";
import "./login.css";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Login = () => {
	const { setTitle } = useContext(AuthContext);

	useEffect(() => {
		setTitle("Login | OneByZero");
	}, []);
	return (
		<div className="flex bg-[#5b24ea] items-center">
			<Left></Left>
			<Right></Right>
		</div>
	);
};

export default Login;
