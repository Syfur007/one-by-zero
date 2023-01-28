import DOMPurify from "dompurify";
import React from "react";
import { useContext } from "react";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";

const CourseBasicInfo = () => {
	const { courses } = useContext(CourseContext);

	function createMarkup(html) {
		return {
			__html: DOMPurify.sanitize(html),
		};
	}

	return (
		<div className="bg-[#282828] rounded-md shadow-md p-10">
			<div>
				<strong className="font-semibold text-white">Course Code: </strong>
				<span className="font-semibold">{courses?.courseCode}</span>
			</div>
			<div>
				<strong className="font-semibold text-white">Credit Hours: </strong>
				<span>{courses?.creditHours}</span>
			</div>
			<div>
				<strong className="font-semibold text-white">Syllabus: </strong>
				<div
					className="text-white"
					dangerouslySetInnerHTML={createMarkup(`${courses?.syllabus}`)}
				></div>
			</div>
		</div>
	);
};

export default CourseBasicInfo;
