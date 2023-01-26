import { EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect } from "react";
import "./TextEditor.css";

const TextEditor = ({ convertedContent, setConvertedContent }) => {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	useEffect(() => {
		let html = convertToHTML(editorState.getCurrentContent());
		setConvertedContent(html);
	}, [editorState, setConvertedContent]);

	function createMarkup(html) {
		return {
			__html: DOMPurify.sanitize(html),
		};
	}

	return (
		<div className="w-full py-5 rounded-md">
			<Editor
				wrapperClassName="demo-wrapper"
				editorClassName="demo-editor"
				onEditorStateChange={setEditorState}
			/>

			<div
				className="bg-white text-black p-5 mt-5 rounded-md"
				dangerouslySetInnerHTML={createMarkup(convertedContent)}
			></div>
		</div>
	);
};

export default TextEditor;
