import React, { useState } from "react";
import { Chip } from "@material-tailwind/react";
import { Document, Page } from "react-pdf";
import reactQuestion from "../../../pdf/react-question.pdf";
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
				{course?.questions ? (
					course.questions.map((q, index) => {
						return (
							<div key={index} className="mt-5">
								<span className="mr-2">question-link:</span>

								<div>
									<Document
										file={reactQuestion}
										onLoadSuccess={onDocumentLoadSuccess}
									>
										<Page pageNumber={pageNumber} />
									</Document>
									<p>
										Page {pageNumber} of {numPages}
									</p>
								</div>
								<a
									className="underline text-light-blue-900"
									target="_blank"
									href={q.link}
									rel="noreferrer"
								>
									{q?.link}
								</a>

								<Chip color="purple" className="ml-3" value={q?.name} />
							</div>
						);
					})
				) : (
					<div>
						<h1 className="mb-5 text-4xl text-center uppercase">
							There is no questions
						</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseQuestion;
