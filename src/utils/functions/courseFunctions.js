export const getPinCourseFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem("onebyzeroedu-course-pin")) || null;
};

export const setPinCourseInLocalStorage = (course) => {
	localStorage.setItem("onebyzeroedu-course-pin", JSON.stringify(course));
};
