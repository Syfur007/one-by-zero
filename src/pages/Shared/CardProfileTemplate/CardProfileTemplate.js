import React from "react";
import useSession from "../../../hooks/useSession";
import useUser from "../../../hooks/useUser";
import Time from "../Time/Time";

function CardProfileTemplate({ email, createdAt, session }) {
	const [, , userDetails] = useUser(email);
	const [sessionDetails] = useSession(session);
	console.log(userDetails);
	console.log(sessionDetails);
	return (
		<div className="w-full flex justify-between items-center bg-purple-600 p-5 rounded-sm">
			<div className="flex items-center">
				<div className="border-2 border-blue-900 rounded-full p-3">
					<img src={userDetails?.image} className="w-16 h-16" alt="" />
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
