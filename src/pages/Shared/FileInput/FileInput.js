import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { info, primary } from "../../../constants/colors.js";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider.js";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";
import FIleModal from "../FileModal/FIleModal.js";
import Loading from "../Loading/Loading.js";
import { departmentYear } from "../../../utils/db/data.js";

const FileInput = ({ name, showResources }) => {
	const [showFileModal, setShowFileModal] = useState(false);
	const [file, setFile] = useState("");
	const [examName, setExamName] = useState("");
	const [session, setSession] = useState("");
	const [bookName, setBookName] = useState("");
	const [author, setAuthor] = useState("");
	const [thumbnail, setThumbnail] = useState("");

	const navigate = useNavigate();

	const {
		setMycourseInfo,
		universities,
		departments,
		courseInfoFromLocalStorage,
		setCourseInfoFromLocalStorage,
		years,
		semesters,
		courseLoading,
	} = useContext(CourseContext);

	const { user } = useContext(AuthContext);
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
	// console.log(courses);
	// fetch course data
	useEffect(() => {
		if (
			(year && semester && varsity && department) ||
			(year && varsity && department && departmentYear.includes(department))
		) {
			fetch("https://server.onebyzeroedu.com/courses", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					year: Number(year),
					semester: departmentYear.includes(department) ? 0 : Number(semester),
					varsity,
					department,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					const dataCourses = data[0]?.courses;
					dataCourses?.sort((a, b) => a.title.localeCompare(b.title));
					setCourses(dataCourses || []);
				})
				.catch((err) => {
					console.log("sina-error", err);
				});
		}
	}, [department, semester, varsity, year]);

	// TODO::CHECK USER
	if (!user?.uid) {
		navigate("/login");
	}

	// TODO:: SUBMIT BUTTON

	const onSubmit = async (data) => {
		const course = data.course || courseInfoFromLocalStorage?.courseTitle;
		const department =
			data.department || courseInfoFromLocalStorage?.department;
		let semester =
			Number(data.semester) || courseInfoFromLocalStorage?.semester;
		const university =
			data.university || courseInfoFromLocalStorage?.university;
		const year = Number(data.year) || courseInfoFromLocalStorage?.year;

		const courseInfo = {
			courseTitle: course,
			department,
			semester,
			varsity: university,
			year,
		};

		if (!course || !department || !semester || !varsity || !year) {
			console.log(courseInfo);
			toast.error("please,Fill all the blank");
			return;
		}

		setCourseInfoFromLocalStorage(courseInfo);
		localStorage.setItem("one-by-zero-courseInfo", JSON.stringify(courseInfo));

		if (showResources) {
			setMycourseInfo(courseInfo);
			navigate("/course");
			return;
		}

		if (!file) {
			toast.error("Please,add file");
			return;
		}

		if (!thumbnail && name !== "questions") {
			toast.error("Please,add Thumbnail");
			return;
		}

		const createContributeQuestions = {
			courseInfo: {
				...courseInfo,
			},
			questions: {
				name: user?.displayName,
				email: user?.email,
				session,
				examName,
				link: file,
			},
		};

		const createContributeBooks = {
			courseInfo,
			books: {
				name: user?.displayName,
				email: user?.email,
				link: file,
				bookName,
				thumbnail: thumbnail,
				author,
				session,
			},
		};

		if (name === "questions") {
			try {
				const { data } = await axios.post(
					`https://server.onebyzeroedu.com/api/contribute/${name}`,
					createContributeQuestions
				);
				// console.log(data);
				if (data) {
					toast.success("question is added");
					setFile("");
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const { data } = await axios.post(
					`https://server.onebyzeroedu.com/api/contribute/${name}`,
					createContributeBooks
				);
				if (data) {
					toast.success(`${name.substring(0, name.length - 1)} is added`);
					setFile("");
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="w-full pt-[70px] pb-10 mt-10 ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="md:w-1/2 w-[90%] p-10 mx-auto bg-[#373737] shadow-2xl rounded-2xl"
			>
				<h1 className="mb-5 text-2xl text-center text-white uppercase">
					{" "}
					{showResources ? "My Resources" : `contribute ${name}`}
				</h1>
				{/* //TODO:: university */}
				<div className="w-4/3">
					<label
						htmlFor=""
						className="block mb-1 font-bold text-white capitalize"
					>
						university
					</label>
					<select
						{...register("university")}
						className="w-full select select-sm select-bordered"
					>
						<option value="University of Barishal">
							University of Barishal
						</option>

						{universities &&
							universities.map((uni) => (
								<option value={uni.name} key={uni._id}>
									{uni.name}
								</option>
							))}
					</select>
				</div>
				{/*//TODO:: department */}
				<div className="mt-5 w-4/3">
					<label
						htmlFor=""
						className="block mb-1 font-bold text-white capitalize"
					>
						department
					</label>
					<select
						{...register("department")}
						className="w-full select select-sm select-bordered"
					>
						<option
							value={
								courseInfoFromLocalStorage?.department
									? courseInfoFromLocalStorage?.department
									: ""
							}
						>
							{courseInfoFromLocalStorage?.department
								? courseInfoFromLocalStorage.department
								: "Select department"}
						</option>
						{departments?.map((department) => {
							if (courseInfoFromLocalStorage?.department === department) {
								return "";
							}
							return (
								<option value={department.name} key={department._id}>
									{department.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="flex w-4/3">
					{/* //TODO:: year */}
					<div className="w-full mt-5 mr-3">
						<label
							htmlFor=""
							className="block mb-1 font-bold text-white capitalize"
						>
							year
						</label>
						<select
							{...register("year", { required: "The year is required" })}
							className="w-full select-sm select select-bordered"
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
					{/* //TODO:: semester */}
					<div className="w-full mt-5">
						<label
							htmlFor=""
							className="block mb-1 font-bold text-white capitalize"
						>
							semester
						</label>
						<select
							{...register("semester", {
								required: "the semester is required",
							})}
							className="w-full select select-sm select-bordered"
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
				</div>
				{/* //TODO:: course title */}
				<div className="mt-5 w-4/3">
					<label
						htmlFor=""
						className="block mb-1 font-bold text-white capitalize"
					>
						Course Title
					</label>
					<select
						{...register("course")}
						className="w-full select select-sm select-bordered"
						required
					>
						<option
							value={
								courseInfoFromLocalStorage?.courseTitle
									? courses.findIndex(
											(course) =>
												course.title === courseInfoFromLocalStorage?.courseTitle
									  ) > -1
										? courseInfoFromLocalStorage?.courseTitle
										: ""
									: ""
							}
						>
							{courseInfoFromLocalStorage?.courseTitle
								? courses.findIndex(
										(course) =>
											course.title === courseInfoFromLocalStorage?.courseTitle
								  ) > -1
									? courseInfoFromLocalStorage?.courseTitle
									: "Select Course"
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
					<div className={`w-full mt-5 form-control ${file && "hidden"}`}>
						<label
							htmlFor="file-input-modal-3"
							onClick={() => setShowFileModal(true)}
							className={`capitalize btn btn-sm  bg-[${primary}] py-2  border-0 shadow-md hover:bg-[${info}]`}
							disabled={file}
						>
							add file
						</label>
						{showFileModal && (
							<FIleModal
								setShowFileModal={setShowFileModal}
								setFile={setFile}
								session={session}
								setSession={setSession}
								setExamName={setExamName}
								setAuthor={setAuthor}
								setBookName={setBookName}
								author={author}
								bookName={bookName}
								examName={examName}
								name={name}
								thumbnail={thumbnail}
								setThumbnail={setThumbnail}
							></FIleModal>
						)}
					</div>
				)}

				<div className="mt-5">
					<button
						type="submit"
						className={`btn  bg-[${primary}] py-2 shadow-md hover:bg-[${info}] border-0 capitalize btn-sm`}
					>
						{showResources
							? "show resources"
							: file
							? "Final step"
							: `Upload ${name}`}
						{file && <span>&gt;&gt;</span>}
					</button>
				</div>
			</form>
		</div>
	);
};

export default FileInput;
