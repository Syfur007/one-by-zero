import React, { useContext, useEffect } from "react";
import Right from "./Right.js";
import Left from "./Left.js";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";
import { primary } from "../../constants/colors.js";

const Signup = () => {
	const { setTitle } = useContext(AuthContext);

	useEffect(() => {
		setTitle("Signup | OneByZero");
	}, [setTitle]);
	return (
		<div
			className={`flex lg:flex-row flex-col bg-[${primary}] pt-[60px] items-center`}
		>
			<Left></Left>
			<Right></Right>
		</div>
	);
};

export default Signup;
