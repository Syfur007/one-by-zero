import { button } from "@material-tailwind/react";
import React from "react";

const CardUser = ({ user }) => {
	const { image, email, isVarified } = user;
	return (
		<div className="flex text-white p-3 rounded-lg bg-[#301b83] m-3">
			<div>
				<img src="" alt="" />
			</div>
			<h1>{email}</h1>
			<div className="ml-3">
				{isVarified ? (
					<span className="bg-green-900 px-2 py-1 rounded-lg text-white">
						varified
					</span>
				) : (
					<button>varify</button>
				)}
			</div>
		</div>
	);
};

export default CardUser;
