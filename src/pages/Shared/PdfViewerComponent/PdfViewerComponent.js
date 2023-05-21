import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import { primary, secondary } from "../../../constants/colors";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import useSession from "../../../hooks/useSession";
import Loading from "../Loading/Loading";
import SigninLoader from "../Loading/SigninLoader";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewerComponent = ({ type, file, link, session, examName }) => {
	const [pdfString, setPdfString] = useState("");
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [sessionDetails] = useSession(session);
	const [pdfLoading, setPdfLoading] = useState(false);

	const { user } = useContext(AuthContext);
	const fullViewHandler = () => {
		alert("Please,Login to see View");
		return;
	};

	useEffect(() => {
		setPdfLoading(true);
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
				setPdfLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setPdfLoading(false);
			});

		let base64String;
	}, [file]);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
		setPdfLoading(false);
	};

	return (
		<div className="w-full relative max-h-[400px] h-[400px] bg-red-400">
			{pdfLoading ? (
				<div className="h-full w-full justify-center items-center flex">
					<SigninLoader />
				</div>
			) : (
				<Document
					file={`data:application/pdf;base64,${pdfString}`}
					onLoadSuccess={onDocumentLoadSuccess}
				>
					<Page pageNumber={pageNumber} />
				</Document>
			)}

			<div className="absolute bottom-0 left-0 flex items-center justify-between w-full h-16 px-4  bg-[rgba(0,0,0,0.4)]">
				<div className="  flex flex-row w-full  question-info">
					<span className={`  capitalize p-3 badge bg-[${primary}]`}>
						{examName}
					</span>
					{sessionDetails?.name && (
						<span className={`badge ml-2  p-3 bg-[${primary}]`}>
							{sessionDetails?.name}
						</span>
					)}
				</div>
				<div
					className={`z-10 text-sm font-medium text-white cursor-pointer right-2 bg-[${primary}] px-4 py-2 rounded-md hover:bg-[${secondary}] `}
				>
					{user?.uid ? (
						<a
							href={`${DEFAULT_URL_SERVER}${link}`}
							rel="noopener noreferrer"
							target="_blank"
						>
							View
						</a>
					) : (
						<button onClick={fullViewHandler}>View</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default PdfViewerComponent;
