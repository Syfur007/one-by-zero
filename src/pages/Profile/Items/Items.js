import React from "react";
import CardQuestion from "../../Course/CourseQuestion/CardQuestion";
import CardTemplate from "../../Shared/CardTemplate/CardTemplate";

const Items = ({ items, active }) => {
	console.log(items);
	return (
		<>
			{items && active === "questions"
				? items?.map((item) => <CardQuestion question={item} />)
				: items?.map((item) => <CardTemplate card={item} />)}
		</>
	);
};

export default Items;
