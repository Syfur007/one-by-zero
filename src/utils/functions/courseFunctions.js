import axios from "axios";
const DEFAULT_URL = "https://server.onebyzeroedu.com/";
export const getUniversities = async () => {
	try {
		const data = await axios.get(DEFAULT_URL + "university/");
		return {
			success: true,
			data: data?.data,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const getPinCourseFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem("onebyzeroedu-course-pin")) || null;
};

export const setPinCourseInLocalStorage = (course) => {
	localStorage.setItem("onebyzeroedu-course-pin", JSON.stringify(course));
};

export const setCourseInfo = (course) => {
	localStorage.setItem("one-by-zero-courseInfo", JSON.stringify(course));
};

export const getCourseInfo = () => {
	return JSON.parse(localStorage.getItem("one-by-zero-courseInfo")) || null;
};
