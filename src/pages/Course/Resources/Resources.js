import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { HiXMark } from "react-icons/hi2";
import "./Resources.css";
import CourseModal from "../CourseModal/CourseModal";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
import CourseQuestion from "../CourseQuestion/CourseQuestion";
import CourseBook from "../CourseBook/CourseBook";
import CourseSlides from "../CourseSlides/CourseSlides";

const Resources = ({ course: fetchCourse }) => {
	const { setOpen } = useContext(CourseContext);
	const [elements, setElements] = useState();
	const [course, setCourse] = useState(fetchCourse);
	console.log("test", course);
	useEffect(() => {
		setCourse(JSON.parse(localStorage.getItem("one-by-zero-course")));
	}, []);
	const resourceTypesHandler = (name) => {
		let temp;
		if (name === "questions") {
			temp = (
				<div>
					<CourseQuestion course={fetchCourse}></CourseQuestion>
				</div>
			);
		} else if (name === "books") {
			temp = (
				<div>
					<CourseBook course={fetchCourse}></CourseBook>
				</div>
			);
		} else if (name === "slides") {
			temp = (
				<div>
					<CourseSlides course={fetchCourse}></CourseSlides>
				</div>
			);
		}
		setElements(temp);
		setOpen((prev) => !prev);
	};
	return (
		<>
			<CourseModal elements={elements}></CourseModal>
			<div className=" w-full my-10 text-white">
				<div className="grid grid-cols-4 gap-4">
					<div
						onClick={() => resourceTypesHandler("questions")}
						className="w-56 bg-[#150a31] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#150a31] rounded-lg"
					>
						<h3 className="text-xl font-semibold">Questions</h3>
					</div>
					<div
						onClick={() => resourceTypesHandler("books")}
						className="w-56 bg-[#150a31] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#150a31] rounded-lg"
					>
						<h3 className="text-xl font-semibold">Books</h3>
					</div>
					<div className="w-56 bg-[#150a31] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#150a31] rounded-lg">
						<h3 className="text-xl font-semibold">Class Notes</h3>
					</div>
					<div
						onClick={() => resourceTypesHandler("slides")}
						className="w-56 bg-[#150a31] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#150a31] rounded-lg"
					>
						<h3 className="text-xl font-semibold">Lecture Slide</h3>
					</div>
					<div className="w-56 bg-[#150a31] cursor-pointer flex shadow-lg items-center justify-center p-10 border-2 border-[#150a31] rounded-lg">
						<h3 className="text-xl font-semibold">Suggestions</h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default Resources;
