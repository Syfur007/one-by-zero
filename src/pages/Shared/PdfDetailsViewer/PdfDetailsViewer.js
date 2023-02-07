import React, { useState, useEffect } from "react";
import "./pdfDetailsViewer.css";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { TfiFullscreen } from "react-icons/tfi";
import { GrClose } from "react-icons/gr";
import Loading from "../Loading/Loading";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PDfDetailsViewer = ({ type, file }) => {
	const [pdfString, setPdfString] = useState("");
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [pdfLoading, setLoading] = useState(true);
	const [viewDetails, setViewDetails] = useState(false);

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
		if (pageNumber > 1) {
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
		<div
			className={`${
				viewDetails &&
				" absolute top-0 left-0 right-0 bottom-0 bg-gray-800 z-[50]"
			}`}
		>
			<div
				className={`relative mx-auto${
					viewDetails ? "details_view" : "pdf__details__viewer"
				}`}
			>
				{pdfLoading && <Loading />}
				<Document
					file={`data:application/pdf;base64,${pdfString}`}
					onLoadSuccess={onDocumentLoadSuccess}
				>
					<Page pageNumber={pageNumber} />
				</Document>
				<FaAngleDoubleLeft
					onClick={prevHandler}
					className="w-6 h-6 top-[50%] z-30 p-1 bg-red-500 text-white rounded-full cursor-pointer left-[10%] translate-y-[-50%] absolute"
				/>
				<FaAngleDoubleRight
					onClick={nextHandlerPage}
					className="w-6 h-6 z-30 p-1  cursor-pointer text-white bg-red-500 rounded-full absolute top-[50%] right-[10%] translate-y-[-50%]"
				/>
				<p className=" top-2 left-[10%] absolute text-xl font-bold">
					Page <span className="text-purple-700">{pageNumber}</span> of{" "}
					<span className="text-purple-700">{numPages}</span>
				</p>
				<div
					onClick={() => setViewDetails((prev) => !prev)}
					className="bg-red-400 right-[10%] cursor-pointer absolute top-2"
				>
					{viewDetails ? (
						<GrClose className="w-10 h-10 text-white p-1" />
					) : (
						<TfiFullscreen className="w-10 h-10 text-white p-1" />
					)}
				</div>
			</div>
		</div>
	);
};

export default PDfDetailsViewer;
