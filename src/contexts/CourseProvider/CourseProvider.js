import React, { createContext } from "react";

export const CourseContext = createContext();

const CourseProvider = ({ children }) => {
	const courseInfo = {
		course: {
			name: "anis molla",
		},
	};
	return (
		<CourseContext.Provider value={courseInfo}>
			{children}
		</CourseContext.Provider>
	);
};

export default CourseProvider;
