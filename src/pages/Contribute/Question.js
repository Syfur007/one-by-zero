import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";
import FileInput from "../Shared/FileInput/FileInput.js";

const Question = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Contribute-Questions | OneByZero");
	}, [setTitle]);
	return (
		<div>
			<FileInput name="questions"></FileInput>
		</div>
	);
};

export default Question;
