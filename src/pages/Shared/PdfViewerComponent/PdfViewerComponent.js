import React from "react";
import FileViewer from "react-file-viewer";
import logger from "logging-library";
import axios from "axios";

const PdfViewerComponent = ({ type, file }) => {
	axios
		.get(file, { responseType: "blob", withCredentials: false })
		.then((response) => {
			console.log(response);
			// window.open(URL.createObjectURL(response.data));
		})
		.catch((err) => {
			console.log(err.message);
		});
	return <div>{/* <FileViewer fileType={type} filePath={file} /> */}</div>;
};

export default PdfViewerComponent;
