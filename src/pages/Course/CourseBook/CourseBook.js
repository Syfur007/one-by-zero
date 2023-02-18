import React from "react";
import CardBook from "./CardBook.js";
const CourseBook = ({ course }) => {
	return (
		<div className="w-full ">
			<h1 className="my-3 text-4xl text-center uppercase">Books</h1>
			<div className="flex justify-center">
				<h2 className="mb-5 text-2xl text-center capitalize">
					{course?.courseTitle}
				</h2>
				<h2 className="mb-5 ml-5 text-2xl text-center capitalize">
					{course?.courseCode}
				</h2>
			</div>
			<div>
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
			</div>
		</div>
	);
};

export default CourseBook;
