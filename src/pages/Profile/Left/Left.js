import { Button } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { info, primary, secondary } from "../../../constants/colors.js";
import { DEFAULT_URL_SERVER } from "../../../constants/url.js";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider.js";
import useUser from "../../../hooks/useUser.js";
import ImageInput from "../../Shared/ImageInput/ImageInput.js";
import Loading from "../../Shared/Loading/Loading.js";

const Left = () => {
	const [searchParams] = useSearchParams();
	const queryEmail = searchParams.get("q");
	const [showUploadImageForm, setShowUploadImageFrom] = useState(false);
	const [file, setFile] = useState("");
	const [url, setUrl] = useState("");
	const { user, setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle(`Profile-${user?.displayName} | OneByZero`);
	}, [setTitle, user]);

	const [, , userDetails] = useUser(queryEmail ? queryEmail : user?.email);

	// TODO::CHANGE IMAGE
	const changeImageHandler = (e) => {
		const uploadFile = e.target.files[0];

		const createUrl = URL.createObjectURL(uploadFile);
		setUrl(createUrl);
		setFile(uploadFile);
	};
	//TODO::SUBMIT IMAGE HANDLER
	const submitImageHandler = async () => {
		if (!file) {
			alert("Give the image.ex .png,.jpg,.jpeg");
			return;
		}
		const formData = new FormData();
		formData.append("file", file);
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				authorization: `Bearer ${Cookies.get("one-by-zero-user-token")}`,
			},
		};

		try {
			console.log(Cookies.get("one-by-zero-user-token"));
			const profileData = await axios.post(
				`${DEFAULT_URL_SERVER}/api/upload/profile?email=${user?.email}`,
				formData,
				config
			);

			if (profileData?.data) {
				toast.success("image update successfully");
				setFile("");
				setShowUploadImageFrom(false);
			}
			// console.log(profileData);
		} catch (error) {
			toast.error("File should be less than equal 2mb\nit will be only image");
			setFile("");
			setShowUploadImageFrom(false);
			console.log(error);
		}
	};

	return (
		<div className="w-full px-5 pt-24 my-5 sm:pb-4 sm:w-1/2">
			<div className="w-full p-5 rounded-lg  bg-[#282828]">
				<div className="w-full mb-2 text-center">
					<img
						className={`w-[100px] h-[100px] mx-auto border-[1px] border-[${primary}] rounded-md`}
						src={
							url
								? url
								: userDetails?.image.includes("i.ibb.co")
								? userDetails?.image
								: `${DEFAULT_URL_SERVER}/${userDetails?.image}`
						}
						alt=""
					/>
				</div>
				<h3 className="text-center text-white">{userDetails?.name}</h3>
				{queryEmail ? (
					queryEmail === user?.email && (
						<Button
							size="sm"
							className={`mt-5 bg-[${primary}] hover:bg-[${info}]`}
							onClick={changeImageHandler}
						>
							change image
						</Button>
					)
				) : (
					<>
						<Button
							size="sm"
							className={`mt-5 bg-[${primary}] hover:bg-[${secondary}]`}
							onClick={() => setShowUploadImageFrom((prev) => !prev)}
						>
							change image
						</Button>

						{showUploadImageForm && (
							<div
								className={`my-5 flex flex-col items-center justify-center bg-[${primary}] py-5 rounded-md`}
							>
								<ImageInput onChange={changeImageHandler} />
								{url && file && (
									<Button
										className={`bg-[${secondary}] hover:bg-[${primary}] mt-5`}
										size="sm"
										onClick={submitImageHandler}
									>
										Update Image
									</Button>
								)}
							</div>
						)}
					</>
				)}

				<p className="mt-5 text-white">
					<b>Email: </b>{" "}
					<a href={`mailto:${user?.email}`} className="hover:underline">
						{userDetails?.email}
					</a>
				</p>
			</div>
		</div>
	);
};

export default Left;
