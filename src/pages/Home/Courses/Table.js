import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
import SubTotal from "./SubTotal";

const Table = ({ course }) => {
	const { courses, semester, year, varsity } = course;
	const navigate = useNavigate();
	const { setMycourseInfo } = useContext(CourseContext);
	const showResource = async (courseInfo) => {
		setMycourseInfo(courseInfo);
		navigate("/course");
	};
	const getYear = ["1st", "2nd", "3rd", "4th"];
	return (
		<>
			<div className="mt-5">
				<h1 className="font-semibold capitalize text-center text-2xl text-purple-700">{`${
					getYear[Number(year) - 1]
				} year  ${getYear[Number(semester) - 1]} semester `}</h1>
			</div>
			<SubTotal courses={courses} />
			<div className="overflow-x-auto my-5 text-white text-center bg-[#1a1a1a]">
				<table className="border-collapse table-auto border border-red-200 bg-[#1a1a1a] w-[60%] mx-auto">
					<thead>
						<tr>
							<th className="border border-slate-600 px-2 py-1">#</th>
							<th className="border border-slate-600 px-2 py-1">CourseTitle</th>
							<th className="border border-slate-600 px-2 py-1">CourseCode</th>
							<th className="border border-slate-600 px-2 py-1">Credit</th>
							<th className="border border-slate-600 px-2 py-1">Hours</th>
							<th className="border border-slate-600 px-2 py-1">action</th>
						</tr>
					</thead>
					<tbody>
						{courses &&
							courses.map(({ title, code, credit, hours }, index) => {
								return (
									<tr key={index}>
										<th className="border border-slate-600">{index}</th>
										<td className="border border-slate-600">{title}</td>
										<td className="border border-slate-600">{code}</td>
										<td className="border border-slate-600">{credit}</td>
										<td className="border border-slate-600">{hours}</td>
										<td className="border border-slate-600 px-2">
											<p
												onClick={() =>
													showResource({
														courseTitle: title,
														department: "Computer Science & Engineering",
														semester: semester,
														varsity: varsity,
														year: year,
													})
												}
												className="text-purple-900 cursor-pointer hover:underline hover:text-purple-700"
											>
												resource
											</p>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Table;
