import React, { useContext } from "react";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
import CourseHeader from "../CourseHeader/CourseHeader";

const Course = () => {
	const { mycourseInfo } = useContext(CourseContext);
	return (
		<div>
			<h1 className="bg-[#150E27] text-2xl capitalize pt-5 text-white text-center">
				{mycourseInfo && mycourseInfo?.courseTitle}
			</h1>
			<CourseHeader></CourseHeader>
		</div>
	);
};

export default Course;
