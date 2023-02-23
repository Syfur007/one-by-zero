import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import ScrollTop from "../../../components/ScrollTop/ScrollTop.js";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider.js";
import { getCourses } from "../../../utils/https/courseHttp.js";
import Loading from "../../Shared/Loading/Loading.js";
import CountResources from "../CountResources/CountResources.js";
import Courses from "../Courses/Courses.js";
import HomeTitle from "../HomeTitle/HomeTitle.js";

const Home = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { setTitle } = useContext(AuthContext);

	// TODO: SET TITLE
	useEffect(() => {
		setTitle("Home | OneByZero");
	}, [setTitle]);
	//TODO:: FETCH COURSES
	const { data, isLoading } = useQuery({
		queryKey: ["courses", "computer science and engineering"],
		queryFn: async () => {
			return await getCourses();
		},
	});

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	const toggleVisibility = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setIsVisible(true);
		} else if (scrolled <= 300) {
			setIsVisible(false);
		}
	};

	if (isLoading) {
		return (
			<div className="pt-[70px] pb-10">
				<Loading />
			</div>
		);
	}
	console.log(isVisible);
	return (
		<div className=" bg-[#1a1a1a]  pt-[80px]">
			<CountResources />
			{isVisible && (
				<ScrollTop isVisible={isVisible} setIsVisible={setIsVisible} />
			)}

			<HomeTitle />
			<Courses courses={data} />
		</div>
	);
};

export default Home;
