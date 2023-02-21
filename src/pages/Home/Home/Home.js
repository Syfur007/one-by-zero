import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider.js";
import { getCourses } from "../../../utils/https/courseHttp.js";
import Loading from "../../Shared/Loading/Loading.js";
import CountResources from "../CountResources/CountResources.js";
import Courses from "../Courses/Courses.js";
import HomeTitle from "../HomeTitle/HomeTitle.js";

const Home = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Home | OneByZero");
	}, [setTitle]);
	const { data, isLoading } = useQuery({
		queryKey: ["courses", "computer science and engineering"],
		queryFn: async () => {
			return await getCourses();
		},
	});

	if (isLoading) {
		return (
			<div className="pt-[70px] pb-10">
				<Loading />
			</div>
		);
	}

	return (
		<div className=" bg-[#1a1a1a] pt-[80px]">
			<CountResources />
			<HomeTitle />
			<Courses courses={data} />
		</div>
	);
};

export default Home;
