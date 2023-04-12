import React from "react";
import useUser from "../../../hooks/useUser";
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import { Link } from "react-router-dom";

const Text = ({ text, email, name }) => {
	const [, , userDetails] = useUser(email);

	return (
		<div className="w-full  flex items-center flex-row animated-text">
			<div>
				<img
					src={
						userDetails?.image?.includes("i.ibb.co")
							? userDetails?.image
							: userDetails?.image?.includes("uploads/profile")
							? `${DEFAULT_URL_SERVER}/${userDetails?.image}`
							: userDetails?.image
					}
					alt=""
					className="w-10 h-10 rounded-full border-[1px] border-white"
				/>
			</div>
			<Link
				to={`/profile?q=${email}`}
				className="text-white cursor-pointer hover:text-purple-800 hover:underline ml-2"
				target="_blank"
			>
				{name}
			</Link>
			<p className=" text-white ml-2">{text}</p>
		</div>
	);
};

export default Text;
