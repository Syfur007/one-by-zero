import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";
import FileInput from "../Shared/FileInput/FileInput.js";

const Resources = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Resources | OneByZero");
	}, [setTitle]);
	return (
		<div className="pt-[50px]">
			<FileInput showResources></FileInput>
		</div>
	);
};

export default Resources;
