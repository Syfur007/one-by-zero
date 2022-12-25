import React from "react";
import { Chip } from "@material-tailwind/react";
const CourseSlides = ({ course }) => {
	console.log(course.slides);
	return (
		<div className=" w-[90vw]">
			<h1 className="mb-5 text-4xl text-center uppercase">Slides</h1>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseTitle}
			</h2>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseCode}
			</h2>
			<div>
				{course?.slides.length > 0 ? (
					course.slides.map((q, index) => {
						return (
							<div key={index}>
								<div className="mt-5 ">
									<span className="mr-2">slides-link:</span>
									<a
										className="underline text-light-blue-900"
										target="_blank"
										href={q.link}
										rel="noreferrer"
									>
										{q.link}
									</a>
								</div>
							</div>
						);
					})
				) : (
					<div className="w-full text-white">
						<h1 className="w-full mb-5 text-3xl font-semibold text-center text-red-800">
							There is no slides
						</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseSlides;
