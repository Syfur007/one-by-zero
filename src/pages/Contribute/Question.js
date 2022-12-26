import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import FileInput from "../Shared/FileInput/FileInput";

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
