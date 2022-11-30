import React from "react";
import { Chip } from "@material-tailwind/react";
const CourseSlides = ({ course }) => {
	console.log(course.slides);
	return (
		<div className=" w-[90vw]">
			<h1 className="text-center text-4xl uppercase mb-5">Slides</h1>
			<h2 className="text-center text-2xl capitalize mb-5">
				{course?.courseTitle}
			</h2>
			<h2 className="text-center text-2xl capitalize mb-5">
				{course?.courseCode}
			</h2>
			<div>
				{course?.slides ? (
					course.slides.map((q, index) => {
						return (
							<div key={index}>
								<div className="mt-5 ">
									<span className="mr-2">slides-link:</span>
									<a
										className="text-light-blue-900  underline"
										target="_blank"
										href={q.link}
										rel="noreferrer"
									>
										{q.link}
									</a>
								</div>

								{/* <Chip color="purple" className="ml-3" value={q?.name} /> */}
							</div>
						);
					})
				) : (
					<div>
						<h1 className="text-center text-4xl uppercase mb-5">
							There is no slides
						</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseSlides;
