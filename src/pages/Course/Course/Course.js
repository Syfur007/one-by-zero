import React, { useContext } from "react";
import { useState } from "react";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";
import CourseHeader from "../CourseHeader/CourseHeader.js";
import CourseModal from "../CourseModal/CourseModal.js";

const Course = () => {
	const [elements, setElements] = useState([]);
	const { courses } = useContext(CourseContext);
	if (!courses) {
		return (
			<div className="pt-[64px]">
				<h1 className="py-5 font-semibold text-center text-red-600">
					There is no resources for this course
				</h1>
			</div>
		);
	}
	return (
		<div className="pt-[64px]">
			<h1 className="bg-[#5D25E9] text-2xl capitalize pt-10 text-white text-center">
				{courses && courses?.courseTitle}
			</h1>
			<CourseHeader setElements={setElements}></CourseHeader>
			{elements && <CourseModal elements={elements}></CourseModal>}
		</div>
	);
};

export default Course;
