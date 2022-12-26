import React, { useState } from "react";
import { Chip } from "@material-tailwind/react";
import { Document, Page } from "react-pdf";
import reactQuestion from "../../../pdf/react-question.pdf";
import CardQuestion from "./CardQuestion";
const CourseQuestion = ({ course }) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	return (
		<div className=" w-[90vw]">
			<h1 className="mb-5 text-4xl text-center uppercase">questions</h1>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseTitle}
			</h2>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseCode}
			</h2>
			<div>
				{course && course?.questions.length > 0 ? (
					<div className="grid grid-cols-3 gap-5">
						{course.questions.map((question, index) => (
							<CardQuestion key={index} question={question}></CardQuestion>
						))}
					</div>
				) : (
					<div className="w-full text-white">
						<h1 className="w-full mb-5 text-3xl font-semibold text-center text-red-800">
							There is no questions
						</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseQuestion;
