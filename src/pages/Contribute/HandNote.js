import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import FileInput from "../Shared/FileInput/FileInput";

const HandNote = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Contribute-HandNotes | OneByZero");
	}, [setTitle]);
	return <FileInput name="handnotes"></FileInput>;
};

export default HandNote;
