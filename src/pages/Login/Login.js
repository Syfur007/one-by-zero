import React, { useContext, useEffect } from "react";
import Left from "./Left.js";
import Right from "./Right.js";
import "./login.css";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";

const Login = () => {
	const { setTitle } = useContext(AuthContext);

	useEffect(() => {
		setTitle("Login | OneByZero");
	}, []);
	return (
		<div className="flex bg-[#5b24ea] pt-[40px] items-center">
			<Left></Left>
			<Right></Right>
		</div>
	);
};

export default Login;
