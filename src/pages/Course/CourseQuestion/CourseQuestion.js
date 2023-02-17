import React, { useContext, useState } from "react";
import CardQuestion from "./CardQuestion.js";
import DeleteQuestion from "./DeleteQuestion.js";
import UpdateQuestion from "./UpdateQuestion.js";
import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";

const CourseQuestion = ({ course }) => {
	const { examNames } = useContext(CourseContext);
	const [questions, setQuestions] = useState("");
	const [deleteQuestion, setDeleteQuestion] = useState("");
	console.log(examNames);

	return (
		<div className="w-full">
			<h1 className="py-5 text-4xl text-center uppercase">questions</h1>
			{/* titte of question */}
			<div className="flex flex-col justify-center px-5 sm:flex-row">
				<h2 className="mb-5 mr-0 text-2xl text-center capitalize sm:mr-5">
					{course?.courseTitle}
				</h2>
				<h2 className="mb-5 text-2xl text-center capitalize">
					{course?.courseCode}
				</h2>
			</div>
			<div className="">
				{course && course?.questions.length > 0 ? (
					<>
						<div className="z-10 w-full px-2 mx-auto sm:px-5">
							<Tabs value="all">
								<TabsHeader>
									<Tab key="all" value="all">
										all
									</Tab>
									{examNames?.map((examName) => (
										<Tab key={examName.name} value={examName.name}>
											{examName.name}
										</Tab>
									))}
								</TabsHeader>
								<TabsBody>
									<TabPanel className="p-0" key="all" value="all">
										<div className="grid content-center grid-cols-1 gap-y-5 gap-x-10 lg:grid-cols-3">
											{course.questions.map((question, index) => (
												<CardQuestion
													key={index}
													setQuestions={setQuestions}
													question={question}
													setDeleteQuestion={setDeleteQuestion}
												></CardQuestion>
											))}
										</div>
									</TabPanel>
									{examNames.map((examName) => (
										<TabPanel
											key={examName.name}
											className="p-0"
											value={examName.name}
										>
											<div className="grid content-center grid-cols-1 gap-5 p-2 sm:p-10 lg:grid-cols-3">
												{course.questions.map((question, index) => (
													<>
														{question &&
															question.examName === examName.name && (
																<CardQuestion
																	key={index}
																	setQuestions={setQuestions}
																	question={question}
																	setDeleteQuestion={setDeleteQuestion}
																></CardQuestion>
															)}
													</>
												))}
											</div>
										</TabPanel>
									))}

									{questions && (
										<UpdateQuestion
											questions={{
												...questions,
												courseId: course._id,
											}}
											setQuestions={setQuestions}
										></UpdateQuestion>
									)}
									{deleteQuestion && (
										<DeleteQuestion
											deleteQuestion={deleteQuestion}
											setDeleteQuestion={setDeleteQuestion}
										></DeleteQuestion>
									)}
								</TabsBody>
							</Tabs>
						</div>
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
