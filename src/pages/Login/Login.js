import React from "react";
import Left from "./Left";
import Right from "./Right";
import "./login.css";

const Login = () => {
	return (
		<div className="flex bg-[#5b24ea] items-center">
			<Left></Left>
			<Right></Right>
		</div>
	);
};

export default Login;
