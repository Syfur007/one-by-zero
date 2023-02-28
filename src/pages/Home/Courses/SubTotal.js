import React from "react";

const SubTotal = ({ courses }) => {
	const totalCourse = courses.length;
	const totalCredit = courses.reduce(
		(total, course) => total + course.credit,
		0
	);
	const totalCreditHours = courses.reduce(
		(total, course) => total + course.hours,
		0
	);
	return (
		<table class="border-collapse border border-slate-500 text-left my-5 px-3 py-1 text-white w-[300px] mx-auto">
			<tbody>
				<tr>
					<td class="border border-slate-700 px-3 py-1">Total Courses:</td>
					<td class="border border-slate-700 px-3 py-1 ">{totalCourse}</td>
				</tr>
				<tr>
					<td class="border border-slate-700 px-3 py-1">Total Credits:</td>
					<td class="border border-slate-700 px-3 py-1 ">{totalCredit}</td>
				</tr>
				<tr>
					<td class="border border-slate-700 px-3 py-1">Total Credit Hours:</td>
					<td class="border border-slate-700 px-3 py-1 ">{totalCreditHours}</td>
				</tr>
			</tbody>
		</table>
	);
};

export default SubTotal;
