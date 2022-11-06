import React from "react";
import CourseHeader from "./CourseHeader";

const Course = () => {
	return (
		<div className="bg-black py-10 h-[70vh]">
			<div className="bg-">
				<CourseHeader></CourseHeader>
			</div>
			{/* <div className="course-box grid grid-cols-3">
				<div className="rounded-md border-2 p-10">
					<h3 className="text-4xl">Books</h3>
				</div>
				<div>
					<h3 className="">Questions</h3>
				</div>
				<div>
					<h3>Syllabus</h3>
				</div>
				<div>
					<h3>Suggestions</h3>
				</div>
				<div>
					<h3>Slides</h3>
				</div>
			</div> */}
		</div>
	);
};

export default Course;
