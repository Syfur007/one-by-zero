import React, { createContext, useState } from "react";

export const CourseContext = createContext();

const CourseProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [mycourseInfo, setMycourseInfo] = useState(null);
	const handleOpen = () => setOpen(!open);
	const courseInfo = {
		open,
		setOpen,
		handleOpen,
		mycourseInfo,
		setMycourseInfo,
	};
	return (
		<CourseContext.Provider value={courseInfo}>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseProvider;
