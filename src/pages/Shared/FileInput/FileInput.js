import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider.js";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";
import FIleModal from "../FileModal/FIleModal.js";

const FileInput = ({ name, showResources }) => {
	const [showFileModal, setShowFileModal] = useState(false);
	const [file, setFile] = useState("");
	const [examName, setExamName] = useState("");
	const [session, setSession] = useState("");
	const [bookName, setBookName] = useState("");
	const [author, setAuthor] = useState("");
	const navigate = useNavigate();

	const {
		setMycourseInfo,
		universities,
		departments,
		courseInfoFromLocalStorage,
		setCourseInfoFromLocalStorage,
		years,
		semesters,
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

	console.log(year, varsity, semester, department);
	console.log(courses);
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

		const courseInfo = {
			courseTitle: course,
			department,
			semester,
			varsity: university,
			year,
		};

		if (!course || !department || !semester || !varsity || !year) {
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
			toast.error("please,add file");
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
				console.log(data);
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
		<div className="w-full pt-[70px] pb-10 mt-5 ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="md:w-1/2 w-[90%] p-10 mx-auto bg-[#25184e] shadow-2xl rounded-2xl"
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
					<div className={`w-full mt-5 form-control ${file && "hidden"}`}>
						<label
							htmlFor="file-input-modal-3"
							onClick={() => setShowFileModal(true)}
							className="btn btn-md btn-primary"
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
							></FIleModal>
						)}
					</div>
				)}

				<div className="mt-5">
					<button type="submit" className="btn btn-primary">
						{showResources ? "show resources" : `upload ${name}`}
					</button>
				</div>
			</form>
		</div>
	);
};

export default FileInput;
