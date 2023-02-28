import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { info, primary } from "../../../constants/colors.js";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";
import Loading from "../Loading/Loading.js";
import "./FileModal.css";

const FIleModal = ({
	setShowFileModal,
	setFile,
	session,
	examName,
	setSession,
	setExamName,
	name,
	setAuthor,
	setBookName,
	author,
	bookName,
	thumbnail,
	setThumbnail,
}) => {
	const [uploadFile, setUploadFile] = useState("");
	const [uploadThumbnail, setUploadThumbnail] = useState("");
	const { sessions, examNames } = useContext(CourseContext);
	const [uploadLoading, setUploadLoading] = useState(false);
	const selectedFileTypes = ["application/pdf"];

	//TODO:: catch session value
	const sessionChangeHandler = (e) => {
		setSession(Number(e.target.value));
	};

	//TODO:: submitButtonFuction
	const uploadFileHandler = async () => {
		//TODO:: check questions input
		if (name === "questions" && (!session || !examName)) {
			toast.error("Please filled all the empty input");
			return;
		}

		//TODO:: check books input
		if (
			(name === "books" || name === "slides" || name === "handnotes") &&
			(!author || !bookName)
		) {
			toast.error("Please filled all the empty input");
			return;
		}
		// upload file
		if (uploadFile && selectedFileTypes.includes(uploadFile.type)) {
			//TODO:: upload pdf
			const formData = new FormData();
			formData.append("file", uploadFile);
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const thumbnailFormData = new FormData();
			thumbnailFormData.append("file", uploadThumbnail);

			try {
				setUploadLoading(true);
				const { data } = await axios.post(
					"https://server.onebyzeroedu.com/api/upload/pdf",
					formData,
					config
				);

				const thumbnailData = (
					await axios.post(
						"https://server.onebyzeroedu.com/api/upload/thumbnail",
						thumbnailFormData,
						config
					)
				).data;

				if ((data && thumbnailData) || name === "questions") {
					console.log(data);
					setFile(data);
					setThumbnail(thumbnailData);
					toast.success("click the upload button");
					setUploadLoading(false);
				}
			} catch (error) {
				toast.error(
					"Pdf File should be less than 30mb\n Thumbnail image should be less than 2mb"
				);
				console.log(error);

				setUploadLoading(false);
			}
		} else if (uploadFile && uploadFile.type !== "video/mp4") {
			if (name === "books" || name === "slides" || name === "handnotes") {
				toast.error("Please,add valid file");
				return;
			}
			// TODO:: upload image
			const formData = new FormData();
			formData.append("image", uploadFile);
			const imageHostKey = process.env.REACT_APP_imgbb_key;
			const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
			setUploadLoading(true);
			fetch(url, { method: "POST", body: formData })
				.then((res) => res.json())
				.then((imgData) => {
					if (imgData.success) {
						setFile(imgData.data.url);
						setUploadFile("");
						toast.success(
							"file Upload successfully \n click the upload button"
						);
						setUploadLoading(false);
					}
				})
				.catch((err) => {
					setUploadLoading(false);
					toast.error(err.message);
				});
		} else {
			toast.error("Give pdf/image file!");
		}
	};

	// takefile
	const handleFileChange = (e) => {
		setUploadFile(e.target.files[0]);
	};
	// take thumbnail
	const handleThumbnailChange = (e) => {
		setUploadThumbnail(e.target.files[0]);
	};

	if (uploadLoading) {
		return <Loading></Loading>;
	}

	return (
		<div>
			{/* Put this part before </body> tag */}
			<input type="checkbox" id="file-input-modal-3" className="modal-toggle" />
			<div className={`modal bg-[${primary}]`}>
				<div className={`relative bg-[#1a1a1a] modal-box`}>
					<label
						htmlFor="file-input-modal-3"
						className="absolute btn hover:bg-[#1a1a1a] border-2 hover:border-[#1a1a1a] btn-sm btn-circle right-2 top-2"
					>
						✕
					</label>

					{/* session */}
					{name !== "books" && (
						<div className="pt-2">
							<label htmlFor="" className="block pb-4 text-base font-semibold">
								Session
							</label>
							<select
								onChange={sessionChangeHandler}
								className="w-full text-black border-2 rounded-md outline-none input active:outline-none focus:outline-none input-bordered"
							>
								<option
									value=""
									className="text-black capitalize"
									disabled
									selected
								>
									select session
								</option>
								{sessions &&
									sessions.map((session, index) => (
										<option
											key={index}
											className="text-black capitalize"
											value={session.value}
										>
											{session.name}
										</option>
									))}
							</select>
						</div>
					)}
					{/* exam name */}
					{name === "questions" && (
						<>
							<div className="pt-2">
								<label
									htmlFor=""
									className="block pb-4 text-base font-semibold capitalize"
								>
									Exam Name
								</label>
								<select
									onChange={(e) => setExamName(e.target.value)}
									className="w-full text-black capitalize border-2 rounded-md outline-none input active:outline-none focus:outline-none input-bordered"
								>
									<option
										className="text-black capitalize"
										value=""
										disabled
										selected
									>
										Select Exam Name
									</option>
									{examNames &&
										examNames.map((exam, index) => (
											<option
												key={index}
												className="text-black capitalize"
												value={exam?.name}
											>
												{exam?.name}
											</option>
										))}
								</select>
							</div>
						</>
					)}

					{(name === "books" || name === "slides" || name === "handnotes") && (
						<>
							{/* name */}
							<div className="pt-2">
								<label
									htmlFor=""
									className="block pb-4 text-base font-semibold capitalize"
								>
									{name} Name
								</label>
								<input
									type="text"
									onChange={(e) => setBookName(e.target.value)}
									placeholder={`${name} name...`}
									className="w-full text-black rounded-md outline-none input active:outline-none focus:outline-none input-bordered"
								/>
							</div>
							{/* Author name */}
							<div className="pt-2">
								<label htmlFor="" className="mb-2 text-base font-semibold">
									Author
								</label>
								<input
									type="text"
									onChange={(e) => setAuthor(e.target.value)}
									placeholder="author1,author2,author3....."
									className="w-full text-black border-2 rounded-md outline-none input active:outline-none focus:outline-none input-bordered"
								/>
							</div>
							{/* thumbnails */}

							<div className="pt-2">
								<label
									htmlFor=""
									className="block pb-4 text-base font-semibold"
								>
									Thumbnail
								</label>
								<input
									type="file"
									onChange={handleThumbnailChange}
									className="w-full text-black border-gray-900 file-input file-input-primary "
								/>
							</div>
						</>
					)}

					<div className="pt-2">
						<label htmlFor="" className="block pb-4 text-base font-semibold">
							File
						</label>
						<input
							type="file"
							onChange={handleFileChange}
							className="w-full text-black border-gray-900 file-input-primary file-input "
						/>
					</div>
					{/* //TODO:: FOR MULTIPLE QUESTION IMAGE */}
					{name === "questions" && (
						<div className={`mt-5`}>
							<span className={`text-yellow-900`}>
								*If multiple pages, please make PDF first and then upload
							</span>
							<a
								className={`hover:underline ml-3 text-sm bg-[${primary}] px-3 py-1 hover:text-yellow-900 `}
								href="https://www.ilovepdf.com/jpg_to_pdf"
								target="_blank"
							>
								Create pdf
							</a>
						</div>
					)}

					<div className="flex justify-between pt-5">
						<button
							onClick={uploadFileHandler}
							type="button"
							className={`btn  bg-[${primary}] py-2 shadow-md hover:bg-[${info}] border-0 capitalize btn-sm`}
						>
							Submit
						</button>
						<button
							className={`btn  bg-[${primary}] py-2 shadow-md hover:bg-[${info}] border-0 capitalize btn-sm`}
							onClick={() => setShowFileModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FIleModal;
