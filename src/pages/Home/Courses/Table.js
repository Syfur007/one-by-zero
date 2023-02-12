import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
import { BsPin, BsPinFill } from "react-icons/bs";
import SubTotal from "./SubTotal";
import { setPinCourseInLocalStorage } from "../../../utils/courseFunctions";
import { toast } from "react-hot-toast";

const Table = ({ course, setCoursePin, coursePin, pin }) => {
	const { courses, semester, year, varsity } = course;
	const navigate = useNavigate();
	const { setMycourseInfo } = useContext(CourseContext);

	const showResource = async (courseInfo) => {
		setMycourseInfo(courseInfo);
		navigate("/course");
	};

	const pinHandler = () => {
		setPinCourseInLocalStorage(course);
		setCoursePin(course);
		toast.success("successfully added to pin");
	};

	const getYear = ["1st", "2nd", "3rd", "4th"];
	return (
		<div
			className={`relative lg:w-[60%]  sm:w-[70%] w-full mx-auto ${
				pin && "bg-[#282828] p-5 rounded-md "
			} `}
		>
			{coursePin?._id === course?._id
				? !pin && (
						<BsPinFill
							className="w-6 h-6 absolute top-2 left-2 text-purple-700 cursor-pointer"
							onClick={pinHandler}
						/>
				  )
				: !pin && (
						<BsPin
							className="w-6 h-6 absolute top-2 left-2 text-purple-700 cursor-pointer"
							onClick={pinHandler}
						/>
				  )}

			<div className="mt-5">
				<h1 className="font-semibold capitalize text-center text-2xl text-purple-700">{`${
					getYear[Number(year) - 1]
				} year  ${getYear[Number(semester) - 1]} semester `}</h1>
			</div>
			<SubTotal courses={courses} />
			<div className="overflow-x-auto my-5 text-white text-center bg-[#1a1a1a]">
				<table className="border-collapse table-auto border border-red-200 bg-[#1a1a1a] w-full mx-auto">
					<thead>
						<tr>
							<th className="border border-slate-600 px-2 py-1">#</th>
							<th className="border border-slate-600 px-2 py-1">CourseTitle</th>
							<th className="border border-slate-600 px-2 py-1">CourseCode</th>
							<th className="border border-slate-600 px-2 py-1">Credit</th>
							<th className="border border-slate-600 px-2 py-1">Hours</th>
						</tr>
					</thead>
					<tbody>
						{courses &&
							courses.map(({ title, code, credit, hours }, index) => {
								return (
									<tr key={index}>
										<th className="border border-slate-600">{index + 1}</th>
										<td className="border border-slate-600">
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
												className="text-white text-left pl-5 cursor-pointer hover:underline hover:text-purple-700"
											>
												{title}
											</p>
										</td>
										<td className="border border-slate-600">{code}</td>
										<td className="border border-slate-600">{credit}</td>
										<td className="border border-slate-600">{hours}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
