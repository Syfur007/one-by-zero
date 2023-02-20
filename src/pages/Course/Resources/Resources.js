import React, { useContext } from "react";
import "./Resources.css";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";
import CourseQuestion from "../CourseQuestion/CourseQuestion.js";
import CourseBook from "../CourseBook/CourseBook.js";
import CourseSlides from "../CourseSlides/CourseSlides.js";
import { useNavigate } from "react-router-dom";
import ClassNotes from "../ClassNotes/ClassNotes.js";
import notes from "../../../images/course_category/handNote.jpg";
import books from "../../../images/course_category/books.jpg";
import slides from "../../../images/course_category/slides.jpg";
import questions from "../../../images/course_category/question.jpg";

const Resources = ({ setElements }) => {
	const navigate = useNavigate();
	const { courses, setOpen } = useContext(CourseContext);

	if (!courses) {
		navigate("/");
	}

	const resourceTypesHandler = (name) => {
		let temp;
		if (name === "questions") {
			temp = (
				<div className="w-[100vw]">
					<CourseQuestion course={courses}></CourseQuestion>
				</div>
			);
		} else if (name === "books") {
			temp = (
				<div className="w-[100vw]">
					<CourseBook course={courses}></CourseBook>
				</div>
			);
		} else if (name === "slides") {
			temp = (
				<div className="w-[100vw]">
					<CourseSlides course={courses}></CourseSlides>
				</div>
			);
		} else if (name === "notes") {
			temp = (
				<div className="w-[100vw]">
					<ClassNotes course={courses}></ClassNotes>
				</div>
			);
		}
		setElements(temp);
		setOpen((prev) => !prev);
	};
	return (
		<>
			<div className="w-full h-auto my-10 text-white ">
				<div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
					<div
						onClick={() => resourceTypesHandler("questions")}
						style={{
							backgroundImage: `url(${questions})`,
							backgroundPosition: "center",
							backgroundSize: "cover",
						}}
						className="max-w-[56] relative h-[150px] max-auto bg-[#373737] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#1a1a1a] rounded-lg"
					>
						<div class="overlay">
							<h3 className="text-xl font-semibold">
								Questions (
								<span className="">{courses?.questions?.length}</span>)
							</h3>
						</div>
					</div>
					<div
						onClick={() => resourceTypesHandler("books")}
						style={{
							backgroundImage: `url(${books})`,
							backgroundPosition: "center",
							backgroundSize: "cover",
						}}
						className="max-w-[56] max-auto bg-[#373737] h-[150px] relative cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#1a1a1a] rounded-lg"
					>
						<div className="overlay">
							<h3 className="text-xl font-semibold">
								Books (<span className="">{courses?.books?.length}</span>)
							</h3>
						</div>
					</div>
					<div
						style={{
							backgroundImage: `url(${notes})`,
							backgroundPosition: "center",
							backgroundSize: "cover",
						}}
						onClick={() => resourceTypesHandler("notes")}
						className="max-w-[56] max-auto relative bg-[#373737] h-[150px] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#1a1a1a] rounded-lg"
					>
						<div className="overlay">
							<h3 className="text-xl font-semibold">
								Class Notes (
								<span className="">{courses?.handNotes?.length}</span>)
							</h3>
						</div>
					</div>
					<div
						style={{
							backgroundImage: `url(${slides})`,
							backgroundPosition: "center",
							backgroundSize: "cover",
						}}
						onClick={() => resourceTypesHandler("slides")}
						className="max-w-[56] max-auto bg-[#373737] relative h-[150px] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#1a1a1a] rounded-lg"
					>
						<div className="overlay">
							<h3 className="text-xl font-semibold">
								Lecture Slide (
								<span className="">{courses?.slides?.length}</span>)
							</h3>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Resources;
