import React from "react";
import { useState } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import PdfViewerComponent from "../../Shared/PdfViewerComponent/PdfViewerComponent";

const CardBook = ({ book }) => {
	const [numPages, setNumPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const { link, name, author, bookName } = book;
	const bookNameFromLink = link.substring(13, link.length);
	console.log(bookNameFromLink);
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	const goToPrevPage = () =>
		setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

	const goToNextPage = () =>
		setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
	return (
		<div className="py-5 mx-auto">
			<div className="">
				<div className="mb-3 text-center">
					<h1 className="text-primary">{bookName}</h1>
				</div>
				<div className="flex justify-between mb-2">
					<h3>
						<strong>
							<b>Contributor:</b>{" "}
							<a href="#" className="text-primary">
								{name}
							</a>
						</strong>
					</h3>
					<h3>
						<strong>
							<b>author:</b>{" "}
							<a href="#" className="text-primary">
								{author}
							</a>
						</strong>
					</h3>
				</div>
				<PdfViewerComponent file={`.${link}`}></PdfViewerComponent>
				<div>full view</div>
			</div>
		</div>
	);
};

export default CardBook;
