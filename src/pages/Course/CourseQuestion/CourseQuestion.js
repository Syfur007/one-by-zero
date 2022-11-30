import React from "react";
import { Chip } from "@material-tailwind/react";
const CourseQuestion = ({ course }) => {
	return (
		<div className=" w-[90vw]">
			<h1 className="text-center text-4xl uppercase mb-5">questions</h1>
			<h2 className="text-center text-2xl capitalize mb-5">
				{course?.courseTitle}
			</h2>
			<h2 className="text-center text-2xl capitalize mb-5">
				{course?.courseCode}
			</h2>
			<div>
				{course?.questions ? (
					course.questions.map((q, index) => {
						return (
							<div key={index} className="mt-5">
								<span className="mr-2">question-link:</span>
								<a
									className="text-light-blue-900 underline"
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
						<h1 className="text-center text-4xl uppercase mb-5">
							There is no questions
						</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseQuestion;
