import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
import FIleModal from "../FileModal/FIleModal";
import Loading from "../Loading/Loading";

const FileInput = ({ name, showResources }) => {
	const [showFileModal, setShowFileModal] = useState(false);
	const navigate = useNavigate();

	const {
		setMycourseInfo,
		universities,
		departments,
		courseInfoFromLocalStorage,
		years,
		semesters,
	} = useContext(CourseContext);

	const [courses, setCourses] = useState([]);
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	let year = watch("year") || courseInfoFromLocalStorage?.year;
	let semester = watch("semester") || courseInfoFromLocalStorage?.semester;
	let varsity = watch("university") || courseInfoFromLocalStorage?.varsity;

	let department =
		watch("department") || courseInfoFromLocalStorage?.department;

	// console.log(year, varsity, semester, department);

	// fetch course data
	useEffect(() => {
		if (year && semester && varsity && department)
			fetch("http://localhost:8080/courses", {
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

	const onSubmit = (data) => {
		const course = data.course;
		const department = data.department;
		const semester = Number(data.semester);
		const university = data.university;
		const year = Number(data.year);

		console.log(course, department, semester, year, university);
		const courseInfo = {
			courseTitle: course,
			department,
			semester,
			varsity: university,
			year,
		};

		if (showResources) {
			localStorage.setItem(
				"one-by-zero-courseInfo",
				JSON.stringify(courseInfo)
			);
			setMycourseInfo(courseInfo);
			navigate("/course");
			return;
		}
	};

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
					<label htmlFor="" className="block mb-1 font-bold text-white">
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
				{!showResources && (
					<div class="form-control w-full mt-5">
						<label
							htmlFor="file-input-modal-3"
							onClick={() => setShowFileModal(true)}
							className="btn btn-md btn-primary"
						>
							add file
						</label>
						{showFileModal && (
							<FIleModal setShowFileModal={setShowFileModal}></FIleModal>
						)}
					</div>
				)}

				<div className="mt-5">
					<button type="submit" className="btn btn-active btn-info">
						{showResources ? "show resources" : `upload ${name}`}
					</button>
				</div>
			</form>
		</div>
	);
};

export default FileInput;
