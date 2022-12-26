import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import FileInput from "../Shared/FileInput/FileInput";

const Slides = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Contribute-Slides | OneByZero");
	}, [setTitle]);
	return <FileInput name="slides"></FileInput>;
};

export default Slides;
