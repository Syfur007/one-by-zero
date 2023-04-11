import React from "react";
import { secondary } from "../../../constants/colors";
import RecentTitle from "../RecentTitle/RecentTitle";
import RecentItem from "../RecentItem/RecentItem";

const Recent = ({ data, questions, title, slides }) => {
	return (
		<div className={`bg-[${secondary}] my-5 py-3  rounded-md min-h-[200px]`}>
			<RecentTitle title={title} />
			<div className="px-2">
				{data &&
					data.map((item, index) => (
						<RecentItem
							item={item}
							key={index}
							questions={questions || false}
							slides={slides || false}
						/>
					))}
			</div>
		</div>
	);
};

export default Recent;
