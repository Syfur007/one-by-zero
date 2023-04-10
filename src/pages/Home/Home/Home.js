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
import { secondary } from "../../../constants/colors.js";
import {
	getRecentBooks,
	getRecentHandNotes,
	getRecentQuestions,
	getRecentSlides,
} from "../../../utils/functions/resourceFunctions.js";
import RecentBook from "../RecentItem/RecentItem.js";
import Recent from "../Recent/Recent.js";

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

	// TODO:: FETCH RECENT BOOKS

	const { data: recentBooks = [], isLoading: recentBooksLoading } = useQuery({
		queryKey: ["recentBooks"],
		queryFn: async () => {
			return await getRecentBooks();
		},
	});
	// TODO:: FETCH RECENT QUESTIONS

	const { data: recentQuestions = [], isLoading: recentQuestionsLoading } =
		useQuery({
			queryKey: ["recentQuestions"],
			queryFn: async () => {
				return await getRecentQuestions();
			},
		});
	// TODO:: FETCH RECENT SLIDES

	const { data: recentSlides = [], isLoading: recentSlidesLoading } = useQuery({
		queryKey: ["recentSlides"],
		queryFn: async () => {
			return await getRecentSlides();
		},
	});
	// TODO:: FETCH RECENT HandNotes

	const { data: recentHandNotes = [], isLoading: recentHandNotesLoading } =
		useQuery({
			queryKey: ["recentHandNotes"],
			queryFn: async () => {
				return await getRecentHandNotes();
			},
		});

	// TODO::SCROLL FUNCTIONALITY
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

	return (
		<div className=" bg-[#1a1a1a]  pt-[80px] md:px-0 px-2 flex flex-col md:flex-row ">
			<div className="md:w-[75%] w-full">
				<CountResources />
				{isVisible && (
					<ScrollTop isVisible={isVisible} setIsVisible={setIsVisible} />
				)}
				<HomeTitle />
				<Courses courses={data} />
			</div>
			<div className={`md:w-[25%] w-full  mt-5 md:mx-5 mx-0 `}>
				<Recent
					data={recentQuestions}
					questions={true}
					title="Recent Questions"
				/>
				<Recent data={recentBooks} title="Recent Books" />
				<Recent data={recentSlides} title="Recent Slides" slides={true} />
				<Recent data={recentHandNotes} title="Recent Notes" handNotes={true} />
			</div>
		</div>
	);
};

export default Home;
