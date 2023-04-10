import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { getSessions } from "../../../utils/https/sessionHttp";
import UpdateCard from "../../Shared/UpdateCard/UpdateCard";
import CardSlide from "./CardSlide";
import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import { useEffect } from "react";
const CourseSlides = ({ course }) => {
	const [editSlide, setEditSlide] = useState("");
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [deleteSlide, setDeleteSlide] = useState("");
	const { data, isLoading } = useQuery({
		queryKey: ["sessions"],
		queryFn: async () => await getSessions(),
	});

	useEffect(() => {
		function handleResize() {
			setScreenWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);

		// Cleanup function
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return (
		<div className="w-full ">
			<h1 className="my-3 text-4xl text-center uppercase">Slides</h1>
			<div className="flex flex-col justify-center sm:flex-row">
				<h2 className="mb-2 text-2xl text-center capitalize sm:mb-5">
					{course?.courseTitle}
				</h2>
				<h2 className="mb-5 ml-0 text-2xl text-center capitalize sm:ml-2">
					[{course?.courseCode}]
				</h2>
			</div>

			<Tabs value="0" className="px-5">
				<TabsHeader>
					<Tab key="0" value="0">
						All
					</Tab>
					{data &&
						data.map((session) => (
							<Tab
								key={session?.value}
								className={`${screenWidth < 620 && "hidden"}`}
								value={session?.value}
							>
								{session?.name}
							</Tab>
						))}
				</TabsHeader>
				<TabsBody>
					<TabPanel key="0" value="0">
						<div className="w-full">
							{course?.slides.length > 0 ? (
								<div className="grid content-center grid-cols-1 p-2 gap-y-5 gap-x-5 sm:p-10 md:grid-cols-2 lg:grid-cols-3">
									{course.slides.map((slide, index) => {
										return (
											<CardSlide
												setEditSlide={setEditSlide}
												card={slide}
												key={index}
											/>
										);
									})}
								</div>
							) : (
								<div className="w-full text-white">
									<h1 className="w-full mb-5 text-3xl font-semibold text-center text-red-800">
										There is no slides
									</h1>
								</div>
							)}
						</div>
					</TabPanel>
					{data &&
						data.map((session) => (
							<TabPanel key={session?.value} value={session?.value}>
								<div className="w-full">
									{course?.slides.length > 0 ? (
										<div className="grid content-center grid-cols-1 p-2 gap-y-5 gap-x-5 sm:p-10 md:grid-cols-2 lg:grid-cols-3">
											{course.slides.map((slide, index) => {
												if (slide?.session === session?.value) {
													return (
														<CardSlide
															setEditSlide={setEditSlide}
															card={slide}
															key={index}
														/>
													);
												}
												return <></>;
											})}
										</div>
									) : (
										<div className="w-full text-white">
											<h1 className="w-full mb-5 text-3xl font-semibold text-center text-red-800">
												There is no slides
											</h1>
										</div>
									)}
								</div>
							</TabPanel>
						))}
				</TabsBody>
			</Tabs>
			{editSlide && <UpdateCard card={editSlide} setCard={setEditSlide} />}
		</div>
	);
};

export default CourseSlides;
