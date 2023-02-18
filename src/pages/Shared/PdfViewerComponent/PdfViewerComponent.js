import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import { primary, secondary } from "../../../constants/colors";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewerComponent = ({ type, file, link }) => {
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
		<div className="w-full relative max-h-[400px] bg-red-400">
			<Document
				file={`data:application/pdf;base64,${pdfString}`}
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page pageNumber={pageNumber} />
			</Document>

			<div className="absolute bottom-0 left-0 flex items-center justify-between w-full h-16 px-4  bg-[rgba(0,0,0,0.4)]">
				<p className="text-xl font-semibold text-white ">
					Page {pageNumber} of {numPages}
				</p>
				<div
					className={`z-10 text-sm font-medium text-white cursor-pointer right-2 bg-[${primary}] px-4 py-2 rounded-md hover:bg-[${secondary}] `}
				>
					<a
						href={`${DEFAULT_URL_SERVER}${link}`}
						rel="noreferrer"
						target="_blank"
					>
						full view
					</a>
				</div>
			</div>
		</div>
	);
};

export default PdfViewerComponent;
