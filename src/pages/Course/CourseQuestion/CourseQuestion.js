import React, { useState } from "react";
import CardQuestion from "./CardQuestion.js";
import UpdateQuestion from "./UpdateQuestion.js";
const CourseQuestion = ({ course }) => {
	const [questions, setQuestions] = useState("");

	return (
		<div className="w-full">
			<h1 className="py-5 text-4xl text-center uppercase">questions</h1>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseTitle}
			</h2>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseCode}
			</h2>
			<div className="">
				{course && course?.questions.length > 0 ? (
					<>
						<div className="grid content-center grid-cols-1 gap-5 p-2 sm:p-10 lg:grid-cols-2">
							{course.questions.map((question, index) => (
								<CardQuestion
									key={index}
									setQuestions={setQuestions}
									question={question}
								></CardQuestion>
							))}
						</div>
						{questions && (
							<UpdateQuestion
								questions={{
									...questions,
									courseId: course._id,
								}}
								setQuestions={setQuestions}
							></UpdateQuestion>
						)}
					</>
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
