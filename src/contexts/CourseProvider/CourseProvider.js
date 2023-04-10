import axios from "axios";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import {
	getCourseInfo,
	getUniversities,
} from "../../utils/functions/courseFunctions.js";
import { toast } from "react-hot-toast";
export const CourseContext = createContext();

const CourseProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [universities, setUniversities] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [mycourseInfo, setMycourseInfo] = useState(getCourseInfo());
	const [courseLoading, setCourseLoading] = useState(false);
	const [years, setYears] = useState([]);
	const [semesters, setSemesters] = useState([]);
	const [courses, setCourses] = useState([]);
	const [sessions, setSessions] = useState([]);
	const [examNames, setExamNames] = useState([]);
	const [courseInfoFromLocalStorage, setCourseInfoFromLocalStorage] =
		useState(null);
	const handleOpen = () => setOpen(!open);

	useEffect(() => {
		const initial = async () => {
			// TODO:: GET ALL UNIVERSITIES
			const universitiesData = await getUniversities();
			console.log(universitiesData);
			if (!universitiesData?.success) {
				toast.error(universitiesData?.message, {
					duration: 1000,
				});
				return;
			}
			setUniversities(universitiesData?.data);
		};

		initial();

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

	//TODO:: fetch session
	useEffect(() => {
		fetch("https://server.onebyzeroedu.com/api/session")
			.then((res) => res.json())
			.then((data) => {
				setSessions(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	//TODO: fetch examNames
	useEffect(() => {
		fetch("https://server.onebyzeroedu.com/api/examname")
			.then((res) => res.json())
			.then((data) => {
				setExamNames(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	//TODO:: fetch course information
	useEffect(() => {
		//TODO:: course information
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
		courseLoading,
	};

	return (
		<CourseContext.Provider value={courseInfo}>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseProvider;
