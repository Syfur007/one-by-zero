import React from "react";
import CardClassNote from "./CardClassNote";

const ClassNotes = ({ course }) => {
	return (
		<div className=" w-[90vw]">
			<h1 className="mb-5 text-4xl text-center uppercase">questions</h1>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseTitle}
			</h2>
			<h2 className="mb-5 text-2xl text-center capitalize">
				{course?.courseCode}
			</h2>
			<div>
				{course?.handNotes.length > 0 ? (
					<div className="grid grid-cols-3 gap-5">
						{course.handNotes.map((question, index) => (
							<CardClassNote key={index} note={question}></CardClassNote>
						))}
					</div>
				) : (
					<div className="w-full text-white">
						<h1 className="w-full mb-5 text-3xl font-semibold text-center text-red-800">
							There is no Hand Notes
						</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default ClassNotes;