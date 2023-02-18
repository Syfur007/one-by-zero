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
import "./CardQuestion.css";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
import CardProfileTemplate from "../../Shared/CardProfileTemplate/CardProfileTemplate";
import { Link } from "react-router-dom";

const CardQuestion = ({ question, setQuestions, setDeleteQuestion }) => {
	const { link, examName, session, name, email, createdAt } = question;

	const [, , userDetails] = useUser(email);
	const { user } = useContext(AuthContext);
	const { courses } = useContext(CourseContext);
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

	return (
		<div className="py-2 mb-5">
			{link && link.includes(".pdf") ? (
				<div className="relative mx-auto ">
					<div className="relative flex justify-between items-center rounded-t-md bg-[#282828] border-b-[1px] border-b-gray-500">
						{/* edit button */}
						{role === "admin" && (
							<div className="absolute cursor-pointer threedot-edit top-2 right-3">
								<div className="dropdown dropdown-bottom dropdown-end">
									<label tabIndex={0} className="cursor-pointer ">
										<FaEllipsisH></FaEllipsisH>
									</label>
									<ul
										tabIndex={0}
										className="p-2 shadow dropdown-content menu bg-[#282828] rounded-box w-52"
									>
										<li>
											<label
												onClick={() => setQuestions(question)}
												htmlFor="my-update-modal"
											>
												<a>Edit</a>
											</label>
										</li>
										<li>
											<label
												htmlFor="my-delete-modal"
												onClick={() =>
													setDeleteQuestion({
														courseId: courses?._id,
														questionId: question?._id,
														link,
													})
												}
											>
												<a>delete</a>
											</label>
										</li>
										<li>
											<a>Details</a>
										</li>
									</ul>
								</div>
							</div>
						)}
						{/* user information */}
						<div className="flex items-center w-full">
							<img
								src={userDetails?.image}
								className="w-[60px] h-[60px] rounded-full border-2 m-2 p-1 border-blue-gray-900"
								alt=""
							/>
							<div>
								<h3 className="hover:underline">
									<Link to={`/profile?q=${email}`}>
										{userDetails?.name ? userDetails?.name : "unknown"}
									</Link>
								</h3>
								<Time time={createdAt} />
							</div>
						</div>

						{/* questions information */}

						{/* <div className="justify-end w-full p-2 fle question-info">
							<h3 className="p-2 mr-5 text-right badge-success badge">
								{examName}
							</h3>
							{sessionDetails?.name && (
								<h3 className="p-2 text-right badge-success badge">
									{sessionDetails?.name}
								</h3>
							)}
						</div> */}
					</div>
					<PdfViewerComponent
						file={`.${link}`}
						link={link}
						type="pdf"
					></PdfViewerComponent>
				</div>
			) : (
				<>
					{/* edit modal  of questions*/}
					<div className="shadow-xl bg-[#282828]  rounded-md card">
						{/* question information without image */}
						<div className="relative flex justify-between items-center border-b-[1px] border-b-gray-500">
							{/* edit button */}
							{role === "admin" && (
								<div className="absolute cursor-pointer threedot-edit top-2 right-3">
									<div className="dropdown dropdown-bottom dropdown-end">
										<label tabIndex={0} className="cursor-pointer ">
											<FaEllipsisH></FaEllipsisH>
										</label>
										<ul
											tabIndex={0}
											className="p-2 shadow dropdown-content menu bg-[#282828] rounded-box w-52"
										>
											<li>
												<label
													onClick={() => setQuestions(question)}
													htmlFor="my-update-modal"
												>
													<a>Edit</a>
												</label>
											</li>
											<li>
												<label
													htmlFor="my-delete-modal"
													onClick={() =>
														setDeleteQuestion({
															courseId: courses?._id,
															questionId: question?._id,
															link: link,
														})
													}
												>
													<a>delete</a>
												</label>
											</li>
											<li>
												<a>Details</a>
											</li>
										</ul>
									</div>
								</div>
							)}
							{/* user information */}
							<div className="flex items-center w-full">
								<img
									src={userDetails?.image}
									className="w-[60px] h-[60px] rounded-full border-2 m-2 p-1 border-blue-gray-900"
									alt=""
								/>
								<div>
									<h3 className="hover:underline">
										<Link to={`/profile?q=${email}`}>
											{userDetails?.name ? userDetails?.name : "unknown"}
										</Link>
									</h3>
									<Time time={createdAt} />
								</div>
							</div>
							{/* questions information */}

							{/* <div className="flex items-center justify-end w-full p-2 question-info">
								<h3 className="p-2 mr-5 badge-success badge">{examName}</h3>
								{sessionDetails?.name && (
									<h3 className="p-2 badge-success badge">
										{sessionDetails?.name}
									</h3>
								)}
							</div> */}
						</div>
						{/* questions */}
						<div className="p-0 card-body">
							<a
								href={question.link}
								className="block w-full  h-[400px]"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={question.link}
									className="w-full h-full rounded-b-md"
									alt=""
								/>
							</a>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CardQuestion;
