import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Home = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Home | OneByZero");
	}, [setTitle]);
	return (
		<div className="h-[80vh] pt-[64px]">
			<h1>Home</h1>
		</div>
	);
};

export default Home;
