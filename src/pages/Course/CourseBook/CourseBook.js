import React from "react";
import CardBook from "./CardBook.js";
import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import { getSessions } from "../../../utils/https/sessionHttp.js";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
const CourseBook = ({ course }) => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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
			<h1 className="my-3 text-4xl text-center uppercase">Books</h1>
			<div className="flex flex-col justify-center sm:flex-row">
				<h2 className="mb-5 text-2xl text-center capitalize">
					{course?.courseTitle}
				</h2>
				<h2 className="mb-5 ml-2 text-2xl text-center capitalize sm:ml-5">
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
								className={`${screenWidth < 620 && "hidden"}`}
								skey={session?.value}
								value={session?.value}
							>
								{session?.name}
							</Tab>
						))}
				</TabsHeader>
				<TabsBody>
					<TabPanel key="0" value="0">
						{course?.books.length > 0 ? (
							<div className="grid content-center grid-cols-1 p-2 gap-y-5 gap-x-5 sm:p-10 md:grid-cols-2 lg:grid-cols-3">
								{course.books.map((book, index) => {
									return <CardBook card={book} key={index}></CardBook>;
								})}
							</div>
						) : (
							<div className="w-full text-white">
								<h1 className="w-full mb-5 text-3xl font-semibold text-center text-red-800">
									There is no books
								</h1>
							</div>
						)}
					</TabPanel>
					{data &&
						data.map((session) => (
							<TabPanel key={session?.value} value={session?.value}>
								<div>
									{course?.books.length > 0 ? (
										<div className="grid content-center grid-cols-1 p-2 gap-y-5 gap-x-5 sm:p-10 md:grid-cols-2 lg:grid-cols-3">
											{course.books.map((book, index) => {
												if (book?.session === session?.value) {
													return <CardBook card={book} key={index}></CardBook>;
												}
												return <></>;
											})}
										</div>
									) : (
										<div className="w-full text-white">
											<h1 className="w-full mb-5 text-3xl font-semibold text-center text-red-800">
												There is no books
											</h1>
										</div>
									)}
								</div>
							</TabPanel>
						))}
				</TabsBody>
			</Tabs>
		</div>
	);
};

export default CourseBook;
