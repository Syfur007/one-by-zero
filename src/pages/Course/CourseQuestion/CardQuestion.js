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
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import { primary, secondary } from "../../../constants/colors";

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

	// TODO:: CHECK WHETHER USER LOGIN OR NOT
	const fullViewHandler = () => {
		alert("Please,Login to see View");
		return;
	};

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
								src={`${
									userDetails?.image.includes("i.ibb.co")
										? userDetails?.image
										: DEFAULT_URL_SERVER + "/" + userDetails?.image
								}`}
								className="w-[60px] h-[60px] rounded-full border-2 m-2 p-1 border-blue-gray-900"
								alt=""
							/>
							<div>
								<h3 className="text-white hover:underline">
									<Link className="text-white" to={`/profile?q=${email}`}>
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
						examName={examName}
						session={session}
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
									src={`${
										userDetails?.image.includes("i.ibb.co")
											? userDetails?.image
											: DEFAULT_URL_SERVER + "/" + userDetails?.image
									}`}
									className="w-[60px] h-[60px] rounded-full border-2 m-2 p-1 border-blue-gray-900"
									alt=""
								/>
								<div>
									<h3 className="hover:underline">
										<Link className="text-white" to={`/profile?q=${email}`}>
											{userDetails?.name ? userDetails?.name : "unknown"}
										</Link>
									</h3>
									<Time time={createdAt} />
								</div>
							</div>
						</div>
						{/* questions */}
						<div className="p-0 card-body">
							<div
								href={question.link}
								className="block w-full relative  h-[400px]"
							>
								<img
									src={question.link}
									className="w-full h-full rounded-b-md"
									alt=""
								/>
								<div className="absolute bottom-0 left-0 flex items-center justify-between w-full h-16 px-4  bg-[rgba(0,0,0,0.4)]">
									{/*//TODO:: Questions information */}

									<div className="  flex flex-row w-full  question-info">
										<span className={`  capitalize p-3 badge bg-[${primary}]`}>
											{examName}
										</span>
										{sessionDetails?.name && (
											<span className={`badge ml-2  p-3 bg-[${primary}]`}>
												{sessionDetails?.name}
											</span>
										)}
									</div>

									{/* //TODO:: VIEW SECTION OF CARD */}
									<div
										className={`z-10 text-sm font-medium text-white cursor-pointer right-2 bg-[${primary}] px-4 py-2 rounded-md hover:bg-[${secondary}] `}
									>
										{user?.uid ? (
											<a
												href={`${link}`}
												rel="noopener noreferrer"
												target="_blank"
											>
												View
											</a>
										) : (
											<button onClick={fullViewHandler}>View</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CardQuestion;
