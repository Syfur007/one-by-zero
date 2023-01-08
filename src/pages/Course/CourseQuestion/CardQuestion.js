import "react-photo-view/dist/react-photo-view.css";
import React from "react";
import PdfViewerComponent from "../../Shared/PdfViewerComponent/PdfViewerComponent";
import useUser from "../../../hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import Time from "../../Shared/Time/Time";
import useSession from "../../../hooks/useSession";
import { useState } from "react";
import { useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";

const CardQuestion = ({ question }) => {
	const { link, examName, session, name, email } = question;
	const [, , userDetails] = useUser(email);
	const { user } = useContext(AuthContext);
	const [sessionDetails] = useSession(session);
	const [role, setRole] = useState("");
	useEffect(() => {
		if (user?.email) {
			fetch(`https://server.onebyzeroedu.com/api/user?email=${user?.email}`)
				.then((res) => res.json())
				.then((user) => {
					setRole(user?.userRole);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [user?.email]);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(e);
	};

	return (
		<div className="mx-auto">
			{link && link.includes(".pdf") ? (
				<div className="relative p-2 mx-auto ">
					<PdfViewerComponent file={`.${link}`} type="pdf"></PdfViewerComponent>
					<div className="absolute bottom-[20px] left-[50%] translate-x-[-50%] text-red-700 font-bold cursor-pointer hover:text-red-900 z-10">
						<a
							href={`https://server.onebyzeroedu.com${link}`}
							rel="noreferrer"
							target="_blank"
						>
							full view
						</a>
					</div>
				</div>
			) : (
				<div className="  min-h-[500px]   p-2 mx-auto">
					<div>
						{/* The button to open modal */}

						{/* Put this part before </body> tag */}
						<input type="checkbox" id="my-modal-4" className="modal-toggle" />
						<div className="modal">
							<div className="relative bg-[#190941] modal-box">
								<label
									htmlFor="my-modal-4"
									className="absolute btn btn-sm btn-circle right-2 top-2"
								>
									✕
								</label>
								<form action="" onSubmit={submitHandler}>
									<input type="submit" value="submit" />
								</form>
							</div>
						</div>
					</div>
					<div className="shadow-xl bg-[#5D25E9] rounded-md card">
						<div className="relative flex justify-between">
							{role === "admin" && (
								<div className="absolute cursor-pointer top-2 right-3">
									<div className="dropdown dropdown-bottom dropdown-end">
										<label tabIndex={0} className="cursor-pointer ">
											<FaEllipsisH></FaEllipsisH>
										</label>
										<ul
											tabIndex={0}
											className="p-2 shadow dropdown-content menu bg-[#190941] rounded-box w-52"
										>
											<li>
												<label htmlFor="my-modal-4" className="btn">
													<a>Item 1</a>
												</label>
											</li>
											<li>
												<a>Item 2</a>
											</li>
										</ul>
									</div>
								</div>
							)}

							<div className="flex items-center">
								<img
									src={userDetails?.image}
									className="w-[60px] h-[60px] rounded-full border-2 m-2 p-1 border-blue-gray-900"
									alt=""
								/>
								<div>
									<h3>{userDetails?.name ? userDetails?.name : "unknown"}</h3>
									<Time time={userDetails?.createdAt} />
								</div>
							</div>

							<div className="flex items-center p-2">
								<h3 className="p-2 mr-5 badge-success badge">{examName}</h3>
								{sessionDetails?.name && (
									<h3 className="p-2 badge-success badge">
										{sessionDetails?.name}
									</h3>
								)}
							</div>
						</div>
						<figure>
							<a
								href={question.link}
								className="block w-full mx-auto"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={question.link}
									className="w-[480px] h-[400px]"
									alt=""
								/>
							</a>
						</figure>
					</div>
				</div>
			)}
		</div>
	);
};

export default CardQuestion;
