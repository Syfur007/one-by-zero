import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import CardUser from "../CardUser/CardUser";

const Users = () => {
	const {
		data: users = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const { data } = await axios.get(
				"https://server.onebyzeroedu.com/api/user/all"
			);
			return data;
		},
	});
	console.log(users);
	return (
		<div>
			<h1 className="text-center text-white text-2xl">users</h1>
			<div className="p-10">
				{isLoading && <Loading></Loading>}
				<table className="w-full">
					<tr className="bg-[#1A103D] rounded-md text-white text-left">
						<th className="p-5">Email</th>
						<th>isVarified</th>
						<th>phoneNumber</th>
						<th>point</th>
					</tr>

					{users &&
						users.map((user) => {
							return (
								<tr
									key={user?._id}
									className="text-white bg-[rgba(26,16,61,.3)] m-2"
								>
									<td className="p-3 my-2">{user?.email}</td>
									<td>
										{user?.isVarified ? (
											<span>verified</span>
										) : (
											<p>
												<button className=" btn btn-sm btn-primary">
													verify
												</button>
											</p>
										)}
									</td>
									<td>
										{user?.phoneNumber ? (
											user.phoneNumber
										) : (
											<span className="text-red-800">empty</span>
										)}
									</td>
									<td>{user?.point}</td>
								</tr>
							);
						})}
				</table>
				<div></div>
			</div>
		</div>
	);
};

export default Users;
