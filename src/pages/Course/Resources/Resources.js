import React, { useContext } from "react";
import "./Resources.css";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";
import CourseQuestion from "../CourseQuestion/CourseQuestion.js";
import CourseBook from "../CourseBook/CourseBook.js";
import CourseSlides from "../CourseSlides/CourseSlides.js";
import { useNavigate } from "react-router-dom";
import ClassNotes from "../ClassNotes/ClassNotes.js";
import notes from "../../../images/course_category/notes.png";
import books from "../../../images/course_category/books.png";
import slides from "../../../images/course_category/slide.png";
import questions from "../../../images/course_category/question.png";

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
						className=" relative max-auto bg-[#373737] hover:bg-[#686868] transition-all ease-in-out duration-500 cursor-pointer flex flex-col shadow-lg items-center justify-center p-10 border-2 border-[#1a1a1a] rounded-lg"
					>
						<div className="w-[100px] h-[100px] p-2 rounded-full">
							<img
								src={questions}
								className="w-full h-full bg-yellow-600 rounded-full "
								alt=""
							/>
						</div>
						<h3 className="mt-2 text-xl font-semibold">
							Questions (<span className="">{courses?.questions?.length}</span>)
						</h3>
					</div>
					<div
						onClick={() => resourceTypesHandler("books")}
						className=" relative max-auto bg-[#373737] hover:bg-[#686868] transition-all ease-in-out duration-500 cursor-pointer flex flex-col shadow-lg items-center justify-center p-10 border-2 border-[#1a1a1a] rounded-lg"
					>
						<div className="w-[100px] h-[100px] p-2 rounded-full">
							<img
								src={books}
								className="w-full h-full bg-yellow-600 rounded-full "
								alt=""
							/>
						</div>
						<h3 className="text-xl font-semibold">
							Books (<span className="">{courses?.books?.length}</span>)
						</h3>
					</div>
					<div
						onClick={() => resourceTypesHandler("notes")}
						className=" relative max-auto bg-[#373737] hover:bg-[#686868] transition-all ease-in-out duration-500 cursor-pointer flex flex-col shadow-lg items-center justify-center p-10 border-2 border-[#1a1a1a] rounded-lg"
					>
						<div className="w-[100px] h-[100px] p-2 rounded-full">
							<img
								src={notes}
								className="w-full h-full bg-yellow-600 rounded-full "
								alt=""
							/>
						</div>
						<h3 className="text-xl font-semibold">
							Notes (<span className="">{courses?.handNotes?.length}</span>)
						</h3>
					</div>
					<div
						onClick={() => resourceTypesHandler("slides")}
						className=" relative max-auto bg-[#373737] hover:bg-[#686868] transition-all ease-in-out duration-500 cursor-pointer flex flex-col shadow-lg items-center justify-center p-10 border-2 border-[#1a1a1a] rounded-lg"
					>
						<div className="w-[100px] h-[100px] p-2 rounded-full">
							<img
								src={slides}
								className="w-full h-full bg-yellow-600 rounded-full "
								alt=""
							/>
						</div>
						<h3 className="text-xl font-semibold">
							Lecture Slides (
							<span className="">{courses?.slides?.length}</span>)
						</h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default Resources;
