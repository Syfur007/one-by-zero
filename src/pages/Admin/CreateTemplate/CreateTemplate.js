import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";
import TextEditor from "../../Shared/Editor/TextEditor.js";
import Loading from "../../Shared/Loading/Loading.js";

const CreateTemplate = ({ name, showResources }) => {
	const [createLoading, setCreateLoading] = useState(false);
	const [convertedContent, setConvertedContent] = useState(null);

	const {
		universities,
		departments,
		courseInfoFromLocalStorage,
		setCourseInfoFromLocalStorage,
		years,
		semesters,
	} = useContext(CourseContext);

	const [courses, setCourses] = useState([]);
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
	} = useForm();

	let year = watch("year") || courseInfoFromLocalStorage?.year;
	let semester = watch("semester") || courseInfoFromLocalStorage?.semester;
	let varsity = watch("university") || courseInfoFromLocalStorage?.varsity;
	let department =
		watch("department") || courseInfoFromLocalStorage?.department;

	// fetch course data
	useEffect(() => {
		if (year && semester && varsity && department)
			fetch("https://server.onebyzeroedu.com/courses", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					year: Number(year),
					semester: Number(semester),
					varsity,
					department,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setCourses(data[0]?.courses);
				})
				.catch((err) => {
					console.log("sina-error", err);
				});
	}, [department, semester, varsity, year]);

	const onSubmit = async (data) => {
		const course = data.course;
		const department = data.department;
		const semester = Number(data.semester);
		const university = data.university;
		const year = Number(data.year);
		const teacherName = data.teacherName || null;
		const teacherEmail = data.teacherEmail || null;
		const session = data.session || null;
		const link = data.link || null;
		const courseCode = data.courseCode;
		const creditHours = data.creditHours;
		const syllabus = data.syllabus;

		const courseInfo = {
			courseTitle: course,
			department,
			semester,
			varsity: university,
			year,
		};

		setCourseInfoFromLocalStorage(courseInfo);
		localStorage.setItem("one-by-zero-courseInfo", JSON.stringify(courseInfo));

		let createCourseTemplate = {
			courseInfo: {
				...courseInfo,
			},
			courseCode,
			creditHours,
			syllabus: convertedContent,
		};

		if (teacherName || teacherEmail || session || link) {
			createCourseTemplate = {
				...createCourseTemplate,
				courseTeachers: {
					teacherName,
					teacherEmail,
					session,
					link,
				},
			};
		}
		try {
			setCreateLoading(true);
			const { data } = await axios.post(
				`https://server.onebyzeroedu.com/api/admin/createCourseTemplate`,
				createCourseTemplate
			);
			if (data) {
				toast.success("template is created");
				setCreateLoading(false);
				reset();
			}
		} catch (error) {
			setCreateLoading(false);
			toast.error(error.message);
			console.log(error);
		}
	};

	if (createLoading) {
		return <Loading></Loading>;
	}

	return (
		<div className="w-full my-10 ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-1/2 p-10 mx-auto bg-[#25184e] shadow-2xl rounded-2xl"
			>
				<h1 className="mb-10 text-4xl text-center text-white uppercase">
					{" "}
					{showResources ? "Show my Resources" : `give ${name}`}
				</h1>
				<div className="w-4/3">
					s
					<label htmlFor="" className="mb-1 font-bold text-white capitalize ">
						university
					</label>
					<select
						{...register("university")}
						className="w-full select select-bordered"
					>
						<option value="University of Barishal">
							University of Barishal
						</option>

						{universities &&
							universities.map((uni) => (
								<option value={uni.name} disabled key={uni._id}>
									{uni.name}
								</option>
							))}
					</select>
				</div>
				<div className="mt-5 w-4/3">
					<label htmlFor="" className="block mb-1 font-bold text-white">
						department
					</label>
					<select
						{...register("department")}
						className="w-full select select-bordered"
					>
						<option value="Computer Science & Engineering">
							Computer Science and Engineering
						</option>
						{departments?.map((university) => (
							<option disabled value={university.name} key={university._id}>
								{university.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="" className="block mt-2 font-bold text-white">
						syllabus
					</label>
					<TextEditor
						convertedContent={convertedContent}
						setConvertedContent={setConvertedContent}
					></TextEditor>
				</div>
				<div className="mt-5 w-4/3">
					<label htmlFor="" className="block mb-1 font-bold text-white">
						year
					</label>
					<select
						{...register("year", { required: "The year is required" })}
						className="w-full select select-bordered"
						required
					>
						<option
							value={
								courseInfoFromLocalStorage?.year
									? courseInfoFromLocalStorage.year
									: ""
							}
						>
							{courseInfoFromLocalStorage
								? `${
										courseInfoFromLocalStorage?.year === 1
											? "1st"
											: courseInfoFromLocalStorage?.year === 2
											? "2nd"
											: courseInfoFromLocalStorage?.year === 3
											? "3rd"
											: "4th"
								  }`
								: "Select Year"}
						</option>
						{years &&
							years.map((year, index) => (
								<option value={year.value} key={index}>
									{year.name}
								</option>
							))}
					</select>
				</div>
				<div className="mt-5 w-4/3">
					<label htmlFor="" className="block mb-1 font-bold text-white">
						semester
					</label>
					<select
						{...register("semester", { required: "the semester is required" })}
						className="w-full select select-bordered"
						required
					>
						<option
							value={
								courseInfoFromLocalStorage?.semester
									? courseInfoFromLocalStorage?.semester
									: ""
							}
						>
							{courseInfoFromLocalStorage
								? courseInfoFromLocalStorage?.semester === 1
									? "1st"
									: "2nd"
								: "Select Semester"}
						</option>
						{semesters &&
							semesters.map((semester, index) => (
								<option value={semester.value} key={index}>
									{semester.name}
								</option>
							))}
					</select>
				</div>
				<div className="mt-5 w-4/3">
					<label htmlFor="" className="block mb-1 font-bold text-white">
						courseTitle
					</label>
					<select
						{...register("course")}
						className="w-full select select-bordered"
						required
					>
						<option
							value={
								courseInfoFromLocalStorage?.courseTitle
									? courseInfoFromLocalStorage?.courseTitle
									: ""
							}
						>
							{courseInfoFromLocalStorage
								? courseInfoFromLocalStorage?.courseTitle
								: "Select Course"}
						</option>
						{courses &&
							courses?.map((course, idx) => (
								<option value={course.title} key={idx}>
									{course.title}
								</option>
							))}
					</select>
				</div>

				<div className="mt-5 w-4/3">
					<label htmlFor="" className="block mb-1 font-bold text-white">
						courseCode
					</label>
					<input
						{...register("courseCode")}
						className="w-full input input-bordered"
						type="text"
						placeholder="CSE-YYYYY"
					></input>
				</div>

				<div className="mt-5 w-4/3">
					<label htmlFor="" className="block mb-1 font-bold text-white">
						creditHours
					</label>
					<input
						{...register("creditHours")}
						className="w-full input input-bordered"
						type="text"
						placeholder="3 Credit, 45 Hours"
					></input>
				</div>

				<div className="mt-5 w-4/3">
					<label htmlFor="" className="block mb-1 font-bold text-white">
						syllabus
					</label>
					<input
						{...register("syllabus")}
						className="w-full input input-bordered"
						type="text"
						placeholder="s1,s2,s3..."
					></input>
				</div>
				<div>
					<h3 className="mt-2 mb-0 text-xl text-center text-white ">
						courseTeachers
					</h3>
					<div>
						<div className="mt-3 w-4/3">
							<label htmlFor="" className="block mb-1 font-bold text-white">
								TeacherName
							</label>
							<input
								{...register("teacherName")}
								className="w-full input input-bordered"
								type="text"
								placeholder="Md.Sina..."
							></input>
						</div>
						<div className="mt-3 w-4/3">
							<label htmlFor="" className="block mb-1 font-bold text-white">
								TeacherEmail
							</label>
							<input
								{...register("teacherEmail")}
								className="w-full input input-bordered"
								type="email"
								placeholder="sina@..."
							></input>
						</div>
						<div className="mt-3 w-4/3">
							<label htmlFor="" className="block mb-1 font-bold text-white">
								Session
							</label>
							<input
								{...register("session")}
								className="w-full input input-bordered"
								type="text"
								placeholder="2017-18"
							></input>
						</div>
						<div className="mt-3 w-4/3">
							<label htmlFor="" className="block mb-1 font-bold text-white">
								Link
							</label>
							<input
								{...register("link")}
								className="w-full input input-bordered"
								type="text"
								placeholder="https://facebook.com/sina"
							></input>
						</div>
					</div>
				</div>

				<div className="mt-5">
					<button type="submit" className="btn btn-primary">
						CreateTemplate
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateTemplate;
