import axios from "axios";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import Loading from "../../pages/Shared/Loading/Loading.js";
export const CourseContext = createContext();

const CourseProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [universities, setUniversities] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [mycourseInfo, setMycourseInfo] = useState(
		JSON.parse(localStorage.getItem("one-by-zero-courseInfo")) || null
	);
	const [courseLoading, setCourseLoading] = useState(false);
	const [years, setYears] = useState([]);
	const [semesters, setSemesters] = useState([]);
	const [courses, setCourses] = useState([]);
	const [sessions, setSessions] = useState([]);
	const [examNames, setExamNames] = useState([]);
	const [courseInfoFromLocalStorage, setCourseInfoFromLocalStorage] =
		useState(null);
	const handleOpen = () => setOpen(!open);
	// form information
	useEffect(() => {
		const fetchUniversities = async () => {
			const res = await fetch("https://server.onebyzeroedu.com/university");
			const data = await res.json();
			setUniversities(data);
		};
		fetchUniversities();

		const fetchDepartment = async () => {
			const res = await fetch("https://server.onebyzeroedu.com/department");
			const data = await res.json();
			setDepartments(data);
		};
		fetchDepartment();

		const fetchYear = async () => {
			const { data } = await axios.get(
				"https://server.onebyzeroedu.com/api/year"
			);
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
			const { data } = await axios.get(
				"https://server.onebyzeroedu.com/api/semester"
			);
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

	// fetch session
	useEffect(() => {
		fetch("https://server.onebyzeroedu.com/api/session")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setSessions(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// fetch examNames
	useEffect(() => {
		fetch("https://server.onebyzeroedu.com/api/examname")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setExamNames(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// fetch course information
	useEffect(() => {
		// course information
		const fetchCourseData = async () => {
			setCourseLoading(true);
			try {
				const { data } = await axios.post(
					"https://server.onebyzeroedu.com/resources/course",
					mycourseInfo
				);
				setCourseLoading(false);
				setCourses(data);
			} catch (error) {
				setCourseLoading(false);
				console.log(error);
			}
		};
		fetchCourseData();
	}, [mycourseInfo]);

	if (courseLoading) {
		return <Loading></Loading>;
	}

	const courseInfo = {
		open,
		setOpen,
		handleOpen,
		mycourseInfo,
		setMycourseInfo,
		universities,
		departments,
		courseInfoFromLocalStorage,
		setCourseInfoFromLocalStorage,
		years,
		semesters,
		setCourses,
		courses,
		sessions,
		examNames,
	};
	return (
		<CourseContext.Provider value={courseInfo}>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseProvider;
