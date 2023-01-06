import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PdfViewerComponent from "../../Shared/PdfViewerComponent/PdfViewerComponent.js";
import "./coursebook.css";
const CourseBookDetails = () => {
	const { bookName } = useParams();
	return (
		<div className="pt-[64px]">
			<div className="px-10 pb-10">
				<PdfViewerComponent />
			</div>
		</div>
	);
};

export default CourseBookDetails;
