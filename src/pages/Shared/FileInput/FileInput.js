import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
import FIleModal from "../FileModal/FIleModal";
import Loading from "../Loading/Loading";

const FileInput = ({ name, showResources }) => {
	const [showFileModal, setShowFileModal] = useState(false);
	const navigate = useNavigate();

	const { setMycourseInfo } = useContext(CourseContext);
	const [courseInfoFromLocalStorage, setCourseInfoFromLocalStorage] =
		useState(null);
	const [courses, setCourses] = useState([]);
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	let year = watch("year");
	let semester = watch("semester");
	let varsity = watch("university");
	let department = watch("department");

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
					console.log(data);
					setCourses(data[0]?.courses);
				})
				.catch((err) => {
					console.log(err);
				});
	}, [department, semester, varsity, year]);

	useEffect(() => {
		const getMyCourseInfoFromLocalstorage = JSON.parse(
			localStorage.getItem("one-by-zero-courseInfo")
		);
		setCourseInfoFromLocalStorage(getMyCourseInfoFromLocalstorage);
	}, []);
	const fetchDepartment = async () => {
		const res = await fetch("http://localhost:8080/department");
		const data = await res.json();
		console.log(data);
		return data;
	};
	const fetchUniversities = async () => {
		const res = await fetch("http://localhost:8080/university");
		const data = await res.json();
		return data;
	};
	const { data: departments = [], isLoading: isLoadingFetchDepartment } =
		useQuery({
			queryKey: ["departments"],
			queryFn: fetchDepartment,
		});

	const { data: universities = [], isLoading: isLoadingFetchUniversities } =
		useQuery({
			queryKey: ["universities"],
			queryFn: fetchUniversities,
		});

	// const { data: courses = [], isLoading: isLoadingFetchCoursesData } = useQuery(
	// 	{
	// 		queryKey: ["courses", year, semester, varsity, department],
	// 		queryFn: () => {
	// 			return fetchCourses(year, semester, varsity, department);
	// 		},
	// 	}
	// );

	// if (isLoadingFetchCoursesData) {
	// 	return <Loading></Loading>;
	// }

	if (isLoadingFetchDepartment) {
		return <Loading></Loading>;
	}

	if (isLoadingFetchUniversities) {
		return <Loading></Loading>;
	}

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
			localStorage.setItem(
				"one-by-zero-courseInfo",
				JSON.stringify(courseInfo)
			);
			setMycourseInfo(courseInfo);
			console.log(data);
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

						{universities.map((uni) => (
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
						<option value={courseInfoFromLocalStorage?.year}>
							{courseInfoFromLocalStorage
								? `${courseInfoFromLocalStorage?.year}`
								: "Select Year"}
						</option>
						<option value="1">1st</option>
						<option value="2">2nd</option>
						<option value="3">3rd</option>
						<option value="4">4th</option>
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
						<option value={courseInfoFromLocalStorage?.semester}>
							{courseInfoFromLocalStorage
								? courseInfoFromLocalStorage?.semester
								: "Select Semester"}
						</option>
						<option value="1">1st</option>
						<option value="2">2nd</option>
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
						<option value={courseInfoFromLocalStorage?.courseTitle}>
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

						{/* <input
							type="file"
							className="w-full file-input file-input-bordered file-input-primary "
							required
						/> */}
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
