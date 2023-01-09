import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PdfViewerComponent = ({ type, file }) => {
	const [pdfString, setPdfString] = useState("");
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	useEffect(() => {
		axios(`https://server.onebyzeroedu.com/api/pdf/`, {
			method: "POST",
			responseType: "blob", //Force to receive data in a Blob Format
			withCredentials: false,
			data: {
				file: file,
			},
		})
			.then((response) => {
				let reader = new FileReader();
				reader.readAsDataURL(response.data);
				reader.onloadend = () => {
					base64String = reader.result;
					setPdfString(base64String.substr(base64String.indexOf(",") + 1));
				};
			})
			.catch((error) => {
				console.log(error);
			});

		let base64String;
	}, [file]);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	return (
		<div className="w-full pdf__viewer">
			<div>
				<Document
					file={`data:application/pdf;base64,${pdfString}`}
					onLoadSuccess={onDocumentLoadSuccess}
				>
					<Page pageNumber={pageNumber} />
				</Document>
			</div>
			<p>
				Page {pageNumber} of {numPages}
			</p>
		</div>
	);
};

export default PdfViewerComponent;
