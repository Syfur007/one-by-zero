import React from "react";
import { useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import useSession from "../../../hooks/useSession";
import useUser from "../../../hooks/useUser";
import Time from "../Time/Time";

function CardProfileTemplate({
	email,
	createdAt,
	session,
	active,
	setUpdateCard,
	card,
}) {
	const { user } = useContext(AuthContext);
	const [, , userDetails] = useUser(email);
	const [role] = useUser(user?.email);

	const [sessionDetails] = useSession(session);
	return (
		<div className=" h-[80px] w-full relative flex justify-between items-center bg-[#282828] py-5 px-2 rounded-sm">
			<div className="flex items-center">
				<div className="p-1 border-2 border-blue-900 rounded-full">
					<img
						src={`${
							userDetails?.image.includes("i.ibb.co")
								? userDetails?.image
								: DEFAULT_URL_SERVER + "/" + userDetails?.image
						}`}
						className="w-10 h-10 rounded-full"
						alt=""
					/>
				</div>
				<div className="ml-2 ">
					<h3 className="text-white hover:underline">
						<Link to={`/profile?q=${email}`}>{userDetails?.name}</Link>
					</h3>
					<Time time={createdAt} />
				</div>
			</div>
			{/* TODO:: ACTION */}
			<div className="absolute cursor-pointer threedot-edit top-2 right-3">
				<div className="dropdown dropdown-bottom dropdown-end">
					<label tabIndex={12} className="cursor-pointer ">
						<span>
							<BsThreeDots className="w-5 h-5 text-yellow-800 cursor-pointer hover:text-yellow-900" />
						</span>
					</label>
					<ul
						tabIndex={12}
						className="p-2 shadow dropdown-content menu bg-[#282828] rounded-box w-52"
					>
						{(user?.email === email || role === "admin") && (
							<>
								<li>
									<label
										onClick={() => setUpdateCard(card)}
										htmlFor="my-update-modal"
									>
										Edit
									</label>
								</li>
								{role === "admin" && (
									<li>
										<label htmlFor="my-delete-modal">
											<a>delete</a>
										</label>
									</li>
								)}
							</>
						)}

						<li>
							<a>share link</a>
						</li>
					</ul>
				</div>
			</div>

			<p className="text-white">{sessionDetails?.name}</p>
		</div>
	);
}

export default CardProfileTemplate;
