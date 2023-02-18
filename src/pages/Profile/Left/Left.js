import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider.js";
import useUser from "../../../hooks/useUser.js";
import Loading from "../../Shared/Loading/Loading.js";

const Left = () => {
	const [searchParams] = useSearchParams();
	const queryEmail = searchParams.get("q");
	const { user, setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle(`Profile-${user?.displayName} | OneByZero`);
	}, [setTitle, user]);

	const [, , userDetails] = useUser(queryEmail ? queryEmail : user?.email);

	// console.log(userDetails);

	return (
		<div className="w-full px-5 pt-24 my-5 sm:pb-4 sm:w-1/2">
			<div className="w-full p-5 rounded-lg  bg-[#282828]">
				<div className="w-full mb-2 text-center">
					<img
						className="w-[100px] h-[100px] mx-auto border-[1px] border-[#5D25E9] rounded-md"
						src={userDetails?.image}
						alt=""
					/>
				</div>
				<h3 className="text-center text-white">{userDetails?.name}</h3>
				<Button size="sm" color="green" className="mt-5">
					change image
				</Button>
				<p className="mt-5 text-white">
					<b>Email: </b>{" "}
					<a href={`mailto:${user?.email}`} className="hover:underline">
						{userDetails?.email}
					</a>
				</p>
			</div>
		</div>
	);
};

export default Left;
