import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
import { BsPin, BsPinFill } from "react-icons/bs";
import SubTotal from "./SubTotal";
import {
	setCourseInfo,
	setPinCourseInLocalStorage,
} from "../../../utils/functions/courseFunctions";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { secondary } from "../../../constants/colors";
import { info } from "../../../constants/colors";
import { primary } from "../../../constants/colors";

const Table = ({ course, setCoursePin, coursePin, pin }) => {
	const { courses, semester, year, varsity } = course;
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const navigate = useNavigate();
	const { setMycourseInfo, setCourseInfoFromLocalStorage } =
		useContext(CourseContext);
	useEffect(() => {
		function handleResize() {
			setScreenWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);

		// Cleanup function
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const showResource = async (courseInfo) => {
		console.log(courseInfo);
		setCourseInfo(courseInfo);
		setCourseInfoFromLocalStorage(courseInfo);
		setMycourseInfo(courseInfo);
		navigate("/course");
	};

	const pinHandler = () => {
		setPinCourseInLocalStorage(course);
		setCoursePin(course);
		toast.success("Successfully Pinned to Top!");
	};

	const getYear = ["1st", "2nd", "3rd", "4th"];
	const totalSemester = 2 * Number(year) + Number(semester) - 2;
	return (
		<div
			className={`relative lg:w-[70%]  sm:w-[80%] w-full mx-auto ${
				pin && "bg-[#282828] p-5 rounded-md "
			} `}
		>
			{coursePin?._id === course?._id
				? !pin && (
						<BsPinFill
							className="absolute w-6 h-6 text-purple-700 cursor-pointer top-2 left-2"
							onClick={pinHandler}
						/>
				  )
				: !pin && (
						<div
							onClick={pinHandler}
							className={`flex px-5 py-2 cursor-pointer shadow-md rounded-md border-2 border-[${primary}] hover:border-white hover:bg-gray-800 hover:font-bold absolute bg-[${secondary}] top-2 left-2 justify-between items-center`}
						>
							<p>
								<BsPin className=" w-6 h-6 text-white" />
							</p>
							<p className="text-white text-sm py-0">Pin to Top</p>
						</div>
				  )}

			<div className="mt-10">
				<h1 className="text-2xl font-semibold text-center text-white capitalize">
					{/* {`${
					getYear[Number(year) - 1]
				} year  ${getYear[Number(semester) - 1]} semester `} */}
					{totalSemester === 1
						? "1st"
						: totalSemester === 2
						? "2nd"
						: totalSemester === 3
						? "3rd"
						: `${totalSemester}th`}{" "}
					semester
				</h1>
			</div>
			<SubTotal courses={courses} />
			<div className="overflow-x-auto my-5 text-white text-center bg-[#1a1a1a]">
				<table className="border-collapse table-auto border border-red-200 bg-[#1a1a1a] w-full mx-auto">
					<thead>
						<tr>
							<th className="px-2 py-1 border border-slate-600">#</th>
							<th className="px-2 py-1 border border-slate-600">
								Course Title
							</th>
							<th className="px-2 py-1 border border-slate-600">Course Code</th>
							<th
								className={` border border-slate-600 ${
									screenWidth < 576 && "hidden"
								} `}
							>
								Credit
							</th>
							<th
								className={` border border-slate-600 ${
									screenWidth < 576 && "hidden"
								} `}
							>
								Hours
							</th>
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
												className="pl-5 text-left text-white cursor-pointer hover:underline hover:text-purple-700"
											>
												{title}
											</p>
										</td>
										<td className="border border-slate-600">{code}</td>
										<td
											className={` border border-slate-600 ${
												screenWidth < 576 && "hidden"
											} `}
										>
											{credit}
										</td>
										<td
											className={`"hidden border border-slate-600 ${
												screenWidth < 576 && "hidden"
											}  `}
										>
											{hours}
										</td>
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
