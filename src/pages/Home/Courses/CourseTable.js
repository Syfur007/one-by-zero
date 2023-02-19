import React, { useState } from "react";
import { getPinCourseFromLocalStorage } from "../../../utils/functions/courseFunctions";
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
