import React from "react";
import { useState } from "react";
import { getPinCourseFromLocalStorage } from "../../../utils/functions/courseFunctions";
import CourseTable from "./CourseTable";
import Table from "./Table";

const Courses = ({ courses }) => {
	const [coursePin, setCoursePin] = useState(getPinCourseFromLocalStorage);
	return (
		<div className="pt-2">
			{coursePin && <Table course={coursePin} pin={true} />}
			{courses?.map((course, index) => (
				<CourseTable
					course={course}
					key={index}
					coursePin={coursePin}
					setCoursePin={setCoursePin}
				/>
			))}
		</div>
	);
};

export default Courses;
