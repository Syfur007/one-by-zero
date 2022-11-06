import React from "react";

const CourseHeader = () => {
	return (
		<div className="mx-[200px]">
			<ul className="flex justify-around rounded-md">
				<li className="py-2 bg-[#282828] hover:bg-[rgba(40,40,40,0.8)] border-2 rounded-md cursor-pointer text-center text-white uppercase flex-1">
					<h3>Resources</h3>
				</li>
				<li className="py-2 cursor-pointer border-2 mx-2 rounded-md bg-[#282828] text-center text-white uppercase border-l-2 flex-1">
					<h3>Basic Info</h3>
				</li>
				<li className="py-2 bg-[#282828] border-2 rounded-md mx-2 text-center cursor-pointer text-white border-l-2 uppercase flex-1">
					<h3>Teacher</h3>
				</li>
				<li className="py-2 bg-[#282828] border-2 rounded-md text-center text-white cursor-pointer border-l-2 uppercase flex-1">
					<h3>Discussion</h3>
				</li>
			</ul>
		</div>
	);
};

export default CourseHeader;
