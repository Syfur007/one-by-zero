import React from "react";
import useSession from "../../../hooks/useSession";
import useUser from "../../../hooks/useUser";
import Time from "../Time/Time";

function CardProfileTemplate({ email, createdAt, session }) {
	const [, , userDetails] = useUser(email);
	const [sessionDetails] = useSession(session);
	return (
		<div className=" h-[80px] w-full flex justify-between items-center bg-[#282828] py-5 px-2 rounded-sm">
			<div className="flex items-center">
				<div className="p-3 border-2 border-blue-900 rounded-full">
					<img src={userDetails?.image} className="w-10 h-10" alt="" />
				</div>
				<div className="ml-2">
					<h3>{userDetails?.name}</h3>
					<Time time={createdAt} />
				</div>
			</div>
			<p>{sessionDetails?.name}</p>
		</div>
	);
}

export default CardProfileTemplate;
