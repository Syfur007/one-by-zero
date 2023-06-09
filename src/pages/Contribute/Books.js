import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";
import FileInput from "../Shared/FileInput/FileInput.js";

const Books = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Contribute-Books | OneByZero");
	}, [setTitle]);
	return <FileInput name="books"></FileInput>;
};

export default Books;
