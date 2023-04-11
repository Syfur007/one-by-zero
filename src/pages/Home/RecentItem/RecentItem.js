import React, { useEffect } from "react";
import Time from "../../Shared/Time/Time";
import useSession from "../../../hooks/useSession";
import { Link } from "react-router-dom";
import { primary, secondary } from "../../../constants/colors";

const RecentItem = ({ item, questions, slides }) => {
	const [sessionDetails] = useSession(item?.session);

	return (
		<div className={`border-gray-700 border-[0.5px] rounded-md p-2 m-2 `}>
			<div className="py-2">
				<h4 className="text-white text-md mb-1 hover:underline hover:text-purple-800 cursor-pointer">
					{questions ? item?.courseTitle : item?.bookName}
				</h4>
				{questions && (
					<p>
						<span
							className={`badge badge-primary bg-[${primary}] border-white py-2 capitalize mr-2`}
						>
							{item?.examName}
						</span>{" "}
						<span
							className={`badge badge-primary bg-[${primary}] border-white py-2 capitalize mr-2`}
						>
							{sessionDetails?.name}
						</span>
					</p>
				)}
				<p className="text-white text-sm ">
					<span>Contributed by:</span>{" "}
					<span className="hover:underline hover:text-purple-800 cursor-pointer">
						<Link to={`/profile?q=${item?.email}`}>{item?.name}</Link>
					</span>
				</p>
				<Time time={item?.createdAt} />
			</div>
		</div>
	);
};

export default RecentItem;
