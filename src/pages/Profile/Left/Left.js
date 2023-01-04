import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

import Loading from "../../Shared/Loading/Loading";

const Left = () => {
	const { user, setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle(`Profile-${user?.displayName} | OneByZero`);
	}, [setTitle, user]);
	const { data: userDetails = [], isLoading } = useQuery({
		queryKey: ["user", `${user?.email}`],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://server.onebyzeroedu.com/api/user?email=${user?.email}`
			);
			return data;
		},
	});
	console.log(userDetails);

	return (
		<div className="pt-24 pb-4 w-[30%] my-5 pl-5">
			<div className="w-full p-5 rounded-lg  bg-[#1A103D]">
				{isLoading && <Loading></Loading>}
				<div className="text-center mb-2 w-full">
					<img
						className="w-[100px] h-[100px] mx-auto border-[1px] border-[#5D25E9] rounded-md"
						src={userDetails?.image}
						alt=""
					/>
				</div>
				<h3 className="text-white text-center">{user?.displayName}</h3>
				<Button size="sm" color="green" className="mt-5">
					change image
				</Button>
				<p className="text-white mt-5">
					<b>Email: </b>{" "}
					<a href={`mailto:${user?.email}`} className="hover:underline">
						{user?.email}
					</a>
				</p>
				<p></p>
			</div>
		</div>
	);
};

export default Left;
