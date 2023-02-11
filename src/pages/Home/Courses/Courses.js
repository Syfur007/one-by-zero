import React from "react";
import CourseTable from "./CourseTable";

const Courses = ({ courses }) => {
	console.log(courses);
	return (
		<div className="pt-2">
			{courses?.map((course, index) => (
				<CourseTable course={course} key={index} />
			))}
		</div>
	);
};

export default Courses;
