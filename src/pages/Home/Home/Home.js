import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider.js";
import { getCourses } from "../../../utils/courseHttp.js";
import Courses from "../Courses/Courses.js";

const Home = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Home | OneByZero");
	}, [setTitle]);
	const { data } = useQuery({
		queryKey: ["courses", "computer science and engineering"],
		queryFn: async () => {
			return await getCourses();
		},
	});

	return (
		<div className=" bg-[#1a1a1a] pt-[80px]">
			<Courses courses={data} />
		</div>
	);
};

export default Home;
