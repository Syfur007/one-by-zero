import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
import useSession from "../../../hooks/useSession";
import Loading from "../../Shared/Loading/Loading";
import default_image from "../../../images/default_image.png";

const UpdateCard = ({ card, setCard }) => {
	const [uploadLoading, setUploadLoading] = useState(false);
	const [uploadFile, setUploadFile] = useState("");
	const { examNames, sessions, setCourses, courses } =
		useContext(CourseContext);
	const [thumbnail, setThumbnail] = useState("");
	const [sessionDetails] = useSession(card?.session);
	const handleFileChange = (event) => {
		// takefile
		setUploadFile(event.target.files[0]);
	};

	const editHandler = async (e) => {
		e.preventDefault();
		const form = e.target;
		const examname = form.examname.value;
		const session = form.session.value;
		let updateQuestion = {
			link: card?.link,
			examName: examname,
			session: Number(session),
			courseId: card?.courseId,
			_id: card._id,
		};
		// upload image
		if (uploadFile) {
			const formData = new FormData();
			formData.append("image", uploadFile);
			const imageHostKey = process.env.REACT_APP_imgbb_key;
			const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

			setUploadLoading(true);
			fetch(url, { method: "POST", body: formData })
				.then((res) => res.json())
				.then((imgData) => {
					if (imgData.success) {
						setThumbnail(imgData.data.url);
						setUploadFile("");
						updateQuestion = { ...updateQuestion, link: imgData?.data?.url };
						axios
							.put(
								"https://server.onebyzeroedu.com/api/contribute/card",
								updateQuestion
							)
							.then((data) => {
								toast.success("question update successfully");
								setCard("");
								setUploadLoading(false);
								const updatedQuestion = courses?.card?.map((course) => {
									if (course._id === card._id) {
										return {
											...course,
											link: imgData?.data?.url,
											examName: examname,
											session: Number(session),
										};
									}
									return course;
								});
								courses.card = [...updatedQuestion];
								setCourses(courses);
								console.log(data);
							})
							.catch((err) => {
								console.log(err);
								setUploadLoading(false);
							});
					}
				})
				.catch((err) => {
					setUploadLoading(false);
					toast.error(err.message);
				});
		} else {
			axios
				.put(
					"https://server.onebyzeroedu.com/api/contribute/card",
					updateQuestion
				)
				.then((data) => {
					toast.success("question update successfully");
					setCard("");
					const updatedQuestion = courses?.card?.map((course) => {
						if (course._id === card._id) {
							return {
								...course,
								examName: examname,
								session: Number(session),
							};
						}
						return course;
					});
					courses.card = [...updatedQuestion];
					setCourses(courses);
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div>
			<div className="modal-wrapper">
				{uploadLoading && <Loading></Loading>}
				<input type="checkbox" id="my-update-modal" className="modal-toggle" />
				<div className=" modal">
					<div className="relative bg-[#190941] modal-box max-w-[70%]">
						<label
							htmlFor="my-update-modal"
							className="absolute btn btn-sm btn-circle right-2 top-2"
						>
							✕
						</label>
						<form
							action=""
							className="max-h-[80vh]  py-2"
							onSubmit={editHandler}
						>
							{/* TODO::sessions */}
							<div className="pt-2">
								<label htmlFor="" className="mb-2 text-base font-semibold">
									Session
								</label>
								<select
									name="session"
									className="w-full text-black border-2 rounded-md outline-none input active:outline-none focus:outline-none input-bordered"
								>
									<option value={sessionDetails?.value} disabled selected>
										{sessionDetails?.name}
									</option>
									{sessions &&
										sessions.map((session, index) => (
											<option
												key={index}
												className="font-bold"
												value={session.value}
											>
												{session.name}
											</option>
										))}
								</select>
							</div>
							{/* card image */}
							<div className="pt-2">
								<div>
									<img
										src={`${
											thumbnail
												? DEFAULT_URL_SERVER + "/" + thumbnail
												: card?.thumbnail
												? DEFAULT_URL_SERVER + "/" + card.thumbnail
												: default_image
										}`}
										className="h-[500px] w-full"
										alt=""
									/>
								</div>
							</div>

							{/* file change */}
							<div className="pt-2">
								<input
									type="file"
									onChange={handleFileChange}
									className="w-full  border-[0.1px] border-gray-400 text-black file-input file-input-primary "
								/>
							</div>
							<div className="my-5">
								<input
									type="submit"
									className="btn btn-primary btn-sm"
									value="edit"
									disabled
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateCard;
