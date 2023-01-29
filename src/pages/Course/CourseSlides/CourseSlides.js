import React from "react";
import CardSlide from "./CardSlide";
const CourseSlides = ({ course }) => {
	return (
		<div className="w-full ">
			<h1 className="my-5 text-4xl text-center uppercase">Slides</h1>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseTitle}
			</h2>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseCode}
			</h2>
			<div className="w-full">
				<></>
				{course?.slides.length > 0 ? (
					<div className="grid content-center grid-cols-1  gap-y-5 gap-x-10 p-2 sm:p-10 lg:grid-cols-2">
						{course.slides.map((slide, index) => {
							return <CardSlide card={slide} key={index} />;
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
		</div>
	);
};

export default CourseSlides;
