import React, { useContext, useEffect } from "react";
import Right from "./Right";
import Left from "./Left";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

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
