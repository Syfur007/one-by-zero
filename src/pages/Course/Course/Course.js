import React, { useContext } from "react";
import { useState } from "react";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";
import Loading from "../../Shared/Loading/Loading.js";
import CourseHeader from "../CourseHeader/CourseHeader.js";
import CourseModal from "../CourseModal/CourseModal.js";

const Course = () => {
	const [elements, setElements] = useState([]);
	const { courses, courseLoading } = useContext(CourseContext);

	if (!courses) {
		return (
			<div className="pt-[80px]">
				<h1 className="py-5 uppercase font-semibold max-w-[400px] my-5 mx-auto rounded-md text-center bg-red-200 text-red-900">
					There is no resources for this course 👎🏽👎🏽
				</h1>
			</div>
		);
	}
	if (courseLoading) {
		return (
			<div className="pt-[70px] pb-10 ">
				<Loading />
			</div>
		);
	}
	return (
		<div className="pt-[64px]">
			<h1 className="bg-[#1a1a1a] text-2xl capitalize pt-10 text-white text-center">
				{courses && courses?.courseTitle} [{courses?.courseCode}].
			</h1>
			<h3 className="mt-1 text-xl text-center text-white capitalize">
				Dept. of Computer Science & Engineering, University of Barishal.
			</h3>
			<CourseHeader setElements={setElements}></CourseHeader>
			{elements && <CourseModal elements={elements}></CourseModal>}
		</div>
	);
};

export default Course;
