import axios from "axios";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
export const CourseContext = createContext();

const CourseProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [universities, setUniversities] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [mycourseInfo, setMycourseInfo] = useState(
		JSON.parse(localStorage.getItem("one-by-zero-courseInfo")) || null
	);
	const [years, setYears] = useState([]);
	const [semesters, setSemesters] = useState([]);
	const [courses, setCourses] = useState([]);
	const [courseInfoFromLocalStorage, setCourseInfoFromLocalStorage] =
		useState(null);
	const handleOpen = () => setOpen(!open);
	// form information
	useEffect(() => {
		const fetchUniversities = async () => {
			const res = await fetch("http://localhost:8080/university");
			const data = await res.json();
			setUniversities(data);
		};
		fetchUniversities();

		const fetchDepartment = async () => {
			const res = await fetch("http://localhost:8080/department");
			const data = await res.json();
			setDepartments(data);
		};
		fetchDepartment();

		const fetchYear = async () => {
			const { data } = await axios.get("http://localhost:8080/api/year");
			// console.log("before", data);
			if (courseInfoFromLocalStorage?.year) {
				const filteredYears = data.filter(
					(year) => year.value !== courseInfoFromLocalStorage.year
				);
				setYears(filteredYears);
			} else {
				setYears(data);
			}
		};

		fetchYear();

		const fetchSemester = async () => {
			const { data } = await axios.get("http://localhost:8080/api/semester");
			if (courseInfoFromLocalStorage?.semester) {
				const filteredSemesters = data.filter(
					(semester) => semester.value !== courseInfoFromLocalStorage.semester
				);

				setSemesters(filteredSemesters);
			} else {
				setSemesters(data);
			}
		};

		fetchSemester();

		const getMyCourseInfoFromLocalstorage = JSON.parse(
			localStorage.getItem("one-by-zero-courseInfo")
		);
		setCourseInfoFromLocalStorage(getMyCourseInfoFromLocalstorage);
	}, [courseInfoFromLocalStorage?.semester, courseInfoFromLocalStorage?.year]);
	// course information

	useEffect(() => {
		console.log(
			"🚀 ~ file: CourseProvider.js:72 ~ useEffect ~ mycourseInfo",
			mycourseInfo
		);
		const fetchCourseData = async () => {
			try {
				const { data } = await axios.post(
					"http://localhost:8080/resources/course",
					mycourseInfo
				);
				console.log(
					"🚀 ~ file: CourseProvider.js:92 ~ fetchCourseData ~ data",
					data
				);
				setCourses(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchCourseData();
	}, [mycourseInfo]);

	const courseInfo = {
		open,
		setOpen,
		handleOpen,
		mycourseInfo,
		setMycourseInfo,
		universities,
		departments,
		courseInfoFromLocalStorage,
		years,
		semesters,
		courses,
	};
	return (
		<CourseContext.Provider value={courseInfo}>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseProvider;
