import React, { useContext, useEffect } from "react";
import Right from "./Right.js";
import Left from "./Left.js";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";

const Signup = () => {
	const { setTitle } = useContext(AuthContext);

	useEffect(() => {
		setTitle("Signup | OneByZero");
	}, [setTitle]);
	return (
		<div className="flex items-center pt-[40px] bg-[#5b24ea]">
			<Left></Left>
			<Right></Right>
		</div>
	);
};

export default Signup;
