import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";

const FileInput = ({ name, showResources }) => {
	const navigate = useNavigate();
	const [universities, setUniversities] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [courses, setCourses] = useState([]);

	const { setMycourseInfo } = useContext(CourseContext);
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const year = watch("year");
	const semester = watch("semester");
	const varsity = watch("university");
	const department = watch("department");
	// console.log(year, semester, varsity, department);

	// fetch course data
	useEffect(() => {
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
				console.log(data);
				setCourses(data[0]?.courses);
			});
	}, [department, semester, varsity, year]);
	// fetch university data
	useEffect(() => {
		fetch("http://localhost:8080/university")
			.then((res) => res.json())
			.then((data) => {
				setUniversities(data);
				console.log(data);
			})
			.catch((err) => console.log(err));
	}, []);
	// fetch department data
	useEffect(() => {
		fetch("http://localhost:8080/department")
			.then((res) => res.json())
			.then((data) => {
				setDepartments(data);
				console.log(data);
			})
			.catch((err) => console.log(err));
	}, []);

	const onSubmit = (data) => {
		const course = data.course;
		const department = data.department;
		const semester = Number(data.semester);
		const university = data.university;
		const year = Number(data.year);

		// console.log(course, department, semester, year, university);
		const courseInfo = {
			courseTitle: course,
			department,
			semester,
			varsity: university,
			year,
		};
		if (showResources) {
			navigate("/course");
			setMycourseInfo(courseInfo);
			console.log(data);
		}
	};

	return (
		<div className="w-full my-10">
			<h1 className="text-4xl text-center uppercase mb-10">
				{" "}
				{showResources ? "Show my Resources" : `give ${name}`}
			</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto">
				<div className="w-4/3">
					<select
						{...register("university")}
						className="select select-bordered w-full"
					>
						<option value="University of Barishal" disabled selected>
							University of Barishal
						</option>

						{universities.map((uni) => (
							<option value={uni.name} disabled key={uni._id}>
								{uni.name}
							</option>
						))}
					</select>
				</div>
				<div className="w-4/3 mt-5">
					<select
						{...register("department")}
						className="select select-bordered w-full"
					>
						<option disabled selected value="Computer Science & Engineering">
							Computer Science and Engineering
						</option>
						{departments.map((uni) => (
							<option disabled value={uni.name} key={uni._id}>
								{uni.name}
							</option>
						))}
					</select>
				</div>
				<div className="w-4/3 mt-5">
					<select
						{...register("year", { required: "The year is required" })}
						className="select select-bordered w-full"
						required
					>
						<option value="" disabled selected>
							Select Year
						</option>
						<option value="1">1st</option>
						<option value="2">2nd</option>
						<option value="3">3rd</option>
						<option value="4">4th</option>
					</select>
				</div>
				<div className="w-4/3 mt-5">
					<select
						{...register("semester", { required: "the semester is required" })}
						className="select select-bordered w-full"
						required
					>
						<option value="" disabled selected>
							Select Semester
						</option>
						<option value="1">1st</option>
						<option value="2">2nd</option>
					</select>
				</div>
				<div className="w-4/3 mt-5">
					<select
						{...register("course")}
						className="select select-bordered w-full"
						required
					>
						<option value="" disabled selected>
							Select Course
						</option>
						{courses?.map((course, idx) => (
							<option value={course.title} key={idx}>
								{course.title}
							</option>
						))}
					</select>
				</div>
				{!showResources && (
					<div class="form-control w-full mt-5">
						<input
							type="file"
							className="file-input file-input-bordered file-input-success w-full "
							required
						/>
					</div>
				)}

				<div className="mt-5">
					<button type="submit" className="btn btn-active btn-secondary">
						{showResources ? "show resources" : `upload ${name}`}
					</button>
				</div>
			</form>
		</div>
	);
};

export default FileInput;
