import React from "react";
import Table from "./Table";

const CourseTable = ({ course, setCoursePin, coursePin }) => {
	return (
		<>
			<Table
				course={course}
				setCoursePin={setCoursePin}
				coursePin={coursePin}
			/>
		</>
	);
};

export default CourseTable;
