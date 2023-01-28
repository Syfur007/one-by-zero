import React, { useState, useEffect } from "react";
import "./pdfDetailsViewer.css";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import Loading from "../Loading/Loading";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PDfDetailsViewer = ({ type, file }) => {
	const [pdfString, setPdfString] = useState("");
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [pdfLoading, setLoading] = useState(true);

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
		setLoading(false);
	};

	const prevHandler = () => {
		if (pageNumber > 0) {
			setPageNumber((prev) => prev - 1);
		} else {
			setPageNumber(numPages);
		}
	};

	const nextHandlerPage = () => {
		if (pageNumber < numPages) {
			setPageNumber((prev) => prev + 1);
		} else {
			setPageNumber(1);
		}
	};

	return (
		<div className="relative mx-auto mb-6 pdf__details__viewer">
			{pdfLoading && <Loading />}
			<Document
				file={`data:application/pdf;base64,${pdfString}`}
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page pageNumber={pageNumber} />
			</Document>
			<FaAngleDoubleLeft
				onClick={prevHandler}
				className="w-6 top-[50%] z-30 p-1 hover:bg-red-500 rounded-full cursor-pointer left-0 tran-x-[-50%] absolute h-6"
			/>
			<FaAngleDoubleRight
				onClick={nextHandlerPage}
				className="w-6 h-6 z-30 p-1  cursor-pointer hover:bg-red-500 rounded-full absolute top-[50%] right-0 translate-y-[-50%] "
			/>
			<p className="absolute bottom-0 py-0 my-0 text-xl font-bold left-1">
				Page <span className="text-purple-700">{pageNumber}</span> of{" "}
				<span className="text-purple-700">{numPages}</span>
			</p>
		</div>
	);
};

export default PDfDetailsViewer;
