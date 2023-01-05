import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PdfViewerComponent from "../../Shared/PdfViewerComponent/PdfViewerComponent.js";
import "./coursebook.css";
const CourseBookDetails = () => {
	const { bookName } = useParams();
	// useEffect(() => {
	// 	fetch()
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setPdf(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, [bookName]);
	return (
		<div className="pt-[64px]">
			<div className="px-10 pb-10">
				<PdfViewerComponent
					document={
						(`https://server.onebyzeroedu.com/uploads/pdf/${bookName}`,
						{
							mode: "no-cors",
						})
					}
				/>
			</div>
		</div>
	);
};

export default CourseBookDetails;
