import React from "react";
import useUser from "../../../hooks/useUser";
import useSession from "../../../hooks/useSession";
import Time from "../../Shared/Time/Time";

function CardProfile({ email, createdAt, session }) {
	const [, , userDetails] = useUser(email);
	const [sessionDetails] = useSession(session);

	return (
		<div className="w-full flex justify-between items-center bg-purple-600 px-5 py-2 rounded-sm">
			<div className="flex items-center">
				<div className="border-2 border-blue-900 rounded-full p-1">
					<img
						src={userDetails?.image}
						className="w-12 h-12 rounded-full"
						alt=""
					/>
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

export default CardProfile;
