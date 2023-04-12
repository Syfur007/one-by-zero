import React from "react";
import "./RecentAnimatedText.css";
import { secondary } from "../../../constants/colors";
import Text from "./Text";

const RecentAnimatedText = ({ texts }) => {
	return (
		<div
			className={`text-container bg-[${secondary}]  w-[60%] my-5 h-16 flex flex-row items-center rounded-md mx-auto`}
		>
			{texts &&
				texts.map((text, index) => {
					return (
						<Text
							text={text?.text}
							name={text?.name}
							email={text?.email}
							key={index}
						/>
					);
				})}
		</div>
	);
};

export default RecentAnimatedText;
