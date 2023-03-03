import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
import useSession from "../../../hooks/useSession";
import { getCookie } from "../../../utils/functions/cookiesFunctions";
import Loading from "../../Shared/Loading/Loading";

const UpdateQuestion = ({ questions, setQuestions }) => {
	const [uploadLoading, setUploadLoading] = useState(false);
	const [uploadFile, setUploadFile] = useState("");
	const { examNames, sessions, setCourses, courses } =
		useContext(CourseContext);
	const { user } = useContext(AuthContext);
	const [file, setFile] = useState("");
	const [sessionDetails] = useSession(questions?.session);
	const handleFileChange = (event) => {
		// takefile
		setUploadFile(event.target.files[0]);
	};

	console.log(questions);
	const editHandler = async (e) => {
		e.preventDefault();
		const form = e.target;
		const examname = form.examname.value;
		const session = form.session.value;
		let updateQuestion = {
			link: questions?.link,
			examName: examname,
			session: Number(session),
			courseId: questions?.courseId,
			_id: questions._id,
		};
		// upload image
		if (uploadFile) {
			const formData = new FormData();
			formData.append("image", uploadFile);
			// const imageHostKey = process.env.REACT_APP_imgbb_key;
			// const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${getCookie()}`,
				},
			};
			setUploadLoading(true);
			// try {
			// 	const questionUrl = (
			// 		await axios.post(
			// 			`https://server.onebyzeroedu.com/api/upload/question?email=${user?.email}`,
			// 			formData,
			// 			config
			// 		)
			// 	).data;
			// } catch (error) {
			// 	console.log(error);
			// 	setUploadLoading(false);
			// 	alert(error?.response?.data?.message || error.message);
			// }

			// fetch(url, { method: "POST", body: formData })
			// 	.then((res) => res.json())
			// 	.then((imgData) => {
			// 		if (imgData.success) {
			// 			setFile(imgData.data.url);
			// 			setUploadFile("");
			// 			updateQuestion = { ...updateQuestion, link: imgData?.data?.url };
			// 			axios
			// 				.put(
			// 					"https://server.onebyzeroedu.com/api/contribute/questions",
			// 					updateQuestion
			// 				)
			// 				.then((data) => {
			// 					toast.success("question update successfully");
			// 					setQuestions("");
			// 					setUploadLoading(false);
			// 					const updatedQuestion = courses?.questions?.map((course) => {
			// 						if (course._id === questions._id) {
			// 							return {
			// 								...course,
			// 								link: imgData?.data?.url,
			// 								examName: examname,
			// 								session: Number(session),
			// 							};
			// 						}
			// 						return course;
			// 					});
			// 					courses.questions = [...updatedQuestion];
			// 					setCourses(courses);
			// 					console.log(data);
			// 				})
			// 				.catch((err) => {
			// 					console.log(err);
			// 					setUploadLoading(false);
			// 				});
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		setUploadLoading(false);
			// 		toast.error(err.message);
			// 	});
		} else {
			//TODO::/ when file is not change
			axios
				.put(
					"https://server.onebyzeroedu.com/api/contribute/questions",
					updateQuestion
				)
				.then((data) => {
					toast.success("question update successfully");
					setQuestions("");
					const updatedQuestion = courses?.questions?.map((course) => {
						if (course._id === questions._id) {
							return {
								...course,
								examName: examname,
								session: Number(session),
							};
						}
						return course;
					});
					courses.questions = [...updatedQuestion];
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
				<div className="modal">
					<div className="relative max-w-[800px] bg-[#190941] modal-box">
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
							{/* examNames */}
							<div className="pt-2">
								<label htmlFor="" className="mb-2 text-base font-semibold">
									Exam Name
								</label>

								<select
									name="examname"
									className="w-full text-black border-2 rounded-md outline-none input active:outline-none focus:outline-none input-bordered"
								>
									<option value={questions?.examName} disabled selected>
										{questions?.examName}
									</option>
									{examNames &&
										examNames.map((exam, index) => (
											<option
												key={index}
												className="font-bold uppercase"
												value={exam?.name}
											>
												{exam?.name}
											</option>
										))}
								</select>
							</div>
							{/* sessions */}
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
							{/* questions image */}
							<div className="pt-2">
								<div>
									<img
										src={
											file
												? file
												: questions?.link?.includes("i.ibb.co")
												? questions?.link
												: `${DEFAULT_URL_SERVER}/${questions?.link}`
										}
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
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateQuestion;
