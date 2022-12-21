import React from "react";
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
				{course?.books ? (
					course.books.map((book, index) => {
						return (
							<div key={index}>
								<div className="mt-5 ">
									<span className="mr-2">book-link:</span>
									<a
										className="underline text-light-blue-900"
										target="_blank"
										href={book["the-book"][0].link}
										rel="noreferrer"
									>
										{book["the-book"][0].link}
									</a>
								</div>

								{/* <Chip color="purple" className="ml-3" value={book?.name} /> */}
							</div>
						);
					})
				) : (
					<div>
						<h1 className="mb-5 text-4xl text-center uppercase">
							There is no questions
						</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseBook;
