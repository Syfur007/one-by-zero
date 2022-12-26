import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import FileInput from "../Shared/FileInput/FileInput";

const Books = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Contribute-Books | OneByZero");
	}, [setTitle]);
	return <FileInput name="books"></FileInput>;
};

export default Books;
