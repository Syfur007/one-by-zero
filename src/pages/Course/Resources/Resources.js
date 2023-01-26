import React, { useContext, useEffect, useState } from "react";
import "./Resources.css";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";
import CourseQuestion from "../CourseQuestion/CourseQuestion.js";
import CourseBook from "../CourseBook/CourseBook.js";
import CourseSlides from "../CourseSlides/CourseSlides.js";
import { useNavigate } from "react-router-dom";
import ClassNotes from "../ClassNotes/ClassNotes.js";

const Resources = ({ course: fetchCourseData, setElements }) => {
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
						className="max-w-[56] max-auto bg-[#150a31] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#150a31] rounded-lg"
					>
						<h3 className="text-xl font-semibold">Questions</h3>
					</div>
					<div
						onClick={() => resourceTypesHandler("books")}
						className="max-w-[56] max-auto bg-[#150a31] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#150a31] rounded-lg"
					>
						<h3 className="text-xl font-semibold">Books</h3>
					</div>
					<div
						onClick={() => resourceTypesHandler("notes")}
						className="max-w-[56] max-auto bg-[#150a31] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#150a31] rounded-lg"
					>
						<h3 className="text-xl font-semibold">Class Notes</h3>
					</div>
					<div
						onClick={() => resourceTypesHandler("slides")}
						className="max-w-[56] max-auto bg-[#150a31] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#150a31] rounded-lg"
					>
						<h3 className="text-xl font-semibold">Lecture Slide</h3>
					</div>
					<div className="max-w-[56] max-auto bg-[#150a31] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#150a31] rounded-lg">
						<h3 className="text-xl font-semibold">Suggestions</h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default Resources;
