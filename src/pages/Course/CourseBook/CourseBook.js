import React from "react";
import CardBook from "./CardBook.js";
const CourseBook = ({ course }) => {
	return (
		<div className=" w-[90vw]">
			<h1 className="mb-5 text-4xl text-center uppercase">Books</h1>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseTitle}
			</h2>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseCode}
			</h2>
			<div>
				{course?.books.length > 0 ? (
					<div className="grid grid-cols-2">
						{course.books.map((book, index) => {
							return <CardBook book={book} key={index}></CardBook>;
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
