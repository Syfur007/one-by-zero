import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider.js";
import useUser from "../../../hooks/useUser.js";
import Loading from "../../Shared/Loading/Loading.js";

const Left = () => {
	const { user, setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle(`Profile-${user?.displayName} | OneByZero`);
	}, [setTitle, user]);

	const [, , userDetails] = useUser(user?.email);

	console.log(userDetails);

	return (
		<div className="w-1/2 pt-24 pb-4 pl-5 my-5">
			<div className="w-full p-5 rounded-lg  bg-[#282828]">
				<div className="w-full mb-2 text-center">
					<img
						className="w-[100px] h-[100px] mx-auto border-[1px] border-[#5D25E9] rounded-md"
						src={userDetails?.image}
						alt=""
					/>
				</div>
				<h3 className="text-center text-white">{user?.displayName}</h3>
				<Button size="sm" color="green" className="mt-5">
					change image
				</Button>
				<p className="mt-5 text-white">
					<b>Email: </b>{" "}
					<a href={`mailto:${user?.email}`} className="hover:underline">
						{user?.email}
					</a>
				</p>
			</div>
		</div>
	);
};

export default Left;
