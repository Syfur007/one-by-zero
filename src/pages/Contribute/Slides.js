import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";
import FileInput from "../Shared/FileInput/FileInput.js";

const Slides = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Contribute-Slides | OneByZero");
	}, [setTitle]);
	return <FileInput name="slides"></FileInput>;
};

export default Slides;
