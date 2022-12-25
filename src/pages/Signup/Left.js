import React, { useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import Alert from "../Shared/Alert/Alert";
import SigninLoader from "../Shared/Loading/SigninLoader";

const Left = () => {
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
	} = useForm();
	const [signupLoading, setSignupLoading] = useState(false);
	const { createUser, updateUserProfile, handleGoogleSignIn } =
		useContext(AuthContext);
	const onSubmit = (data) => {
		setSignupLoading(true);
		const email = watch("email");
		const password = watch("password");
		const name = watch("name");
		const image = watch("image");
		const phoneInputWithCountrySelect = watch("phoneInputWithCountrySelect");
		const isValid = isValidPhoneNumber(phoneInputWithCountrySelect);

		if (!isValid) {
			setError("Phonenumber is not valid");
			setSignupLoading(false);
			return;
		}

		if (!image[0].type.includes("image")) {
			setError("Enter valid image");
			setSignupLoading(false);
			return;
		}
		createUser(email, password)
			.then((user) => {
				const formData = new FormData();
				formData.append("image", image[0]);
				const imageHostKey = process.env.REACT_APP_imgbb_key;
				// upload file in imgbb
				const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
				fetch(url, { method: "POST", body: formData })
					.then((res) => res.json())
					.then((imgData) => {
						if (imgData.success) {
							handleUpdateUserProfile(name, imgData?.data?.url);
						}
					})
					.catch((err) => {
						console.log(err);
					});
				// save data to mongodb
				fetch("http://localhost:8080/api/user/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						phoneNumber: phoneInputWithCountrySelect,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						setSignupLoading(false);
						navigate("/");
					})
					.catch((err) => {
						setSignupLoading(false);
					});
			})
			.catch((err) => {
				console.log(err.message);
				let message = err.message.split(":")[1];
				setError(message);
				setSignupLoading(false);
			});
	};

	const handleUpdateUserProfile = (name, image) => {
		const profile = {
			displayName: name,
			photoURL: image,
		};
		updateUserProfile(profile)
			.then(() => {})
			.catch((err) => {
				let message = err.message.split(":")[1];
				setError(message);
			});
	};

	const signInWithGoogle = () => {
		handleGoogleSignIn()
			.then((user) => {
				console.log(user);
				fetch("http://localhost:8080/api/user/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: user?.user?.email,
						phoneNumber: user?.user?.phoneNumber,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						setSignupLoading(false);
						navigate("/");
					})
					.catch((err) => {
						setSignupLoading(false);
					});
			})
			.catch((err) => {
				let message = err.message.split(":")[1];
				setError(message);
				console.log(err);
			});
	};

	return (
		<div className="flex-1 w-[50%]">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=" bg-[#ffff] mx-auto login-form-height  rounded-2xl  p-10 w-[70%] m-10"
			>
				{error && <Alert>{error}</Alert>}
				<h1 className="mx-auto text-2xl text-[#5b24ea] font-semibold py-5">
					Signup
				</h1>
				<div className="">
					<input
						type="text"
						placeholder="Name"
						{...register("name", {
							required: "Name should not be empty.",
						})}
						className=" border-gray-300 input placeholder:text-gray-600 w-full pl-5 py-2 focus:border-[#5b24ea]  outline-none"
					/>
					<p className="mt-1 text-center text-red-800">
						{errors?.name?.message}
					</p>
				</div>

				<div className="mt-6">
					<label
						htmlFor=""
						className="block mb-2 ml-2 font-medium text-primary"
					>
						User Image
					</label>
					<input
						type="file"
						{...register("image", {
							required: "Image should not be empty.",
						})}
						className="border-gray-300 file-input-primary file-input   w-full focus:border-[#5b24ea]  outline-none"
					/>
					<p className="mt-1 text-center text-red-800">
						{errors?.image?.message}
					</p>
				</div>
				<div className="mt-6">
					<input
						type="email"
						placeholder="Email"
						{...register("email", {
							required: "Email should not be empty.",
						})}
						className=" border-gray-300 input placeholder:text-gray-600 w-full pl-5 py-2 focus:border-[#5b24ea]  outline-none"
					/>
					<p className="mt-1 text-center text-red-800">
						{errors?.email?.message}
					</p>
				</div>
				<div className="w-full mt-6">
					<PhoneInputWithCountry
						name="phoneInputWithCountrySelect"
						control={control}
						rules={{ required: "Phone Number should not be empty" }}
						defaultCountry="BD"
						placeholder="PhoneNumber"
					/>
					<p className="mt-1 text-center text-red-800">
						{errors?.phoneInputWithCountrySelect?.message}
					</p>
				</div>

				<div className="mt-6">
					<input
						type="password"
						placeholder="Password"
						{...register("password", {
							required: "Password should not be empty.",
							minLength: {
								value: 6,
								message: "The password should be at least six characters.",
							},
						})}
						className=" border-gray-300 input placeholder:text-gray-600 w-full pl-5 py-2 focus:border-[#5b24ea]  outline-none"
					/>
					<p className="mt-1 text-center text-red-800">
						{errors?.password?.message}
					</p>
				</div>

				<div className="w-full mt-8 ">
					<button
						type="submit"
						className="w-full button bg-[#5b24ea] py-2 rounded-full items-center justify-between text-xl flex text-white"
					>
						<p className="flex-1 text-center">
							{signupLoading ? (
								<div className="flex items-center justify-center">
									<SigninLoader></SigninLoader>
									<span>Loading.....</span>
								</div>
							) : (
								"Register"
							)}
						</p>
						<p className="mr-3 p-2 bg-white rounded-full text-[#5b24ea]">
							<FaArrowRight></FaArrowRight>
						</p>
					</button>
				</div>
				<div className="flex items-center w-full mx-auto my-3 text-center sm:w-3/4">
					<span className="w-full block h-[1px] mr-2 bg-[#5b24ea]"></span>
					<h4 className="text-2xl text-[#5b24ea] ">OR</h4>
					<span className="w-full block h-[1px] ml-2 bg-[#5b24ea]"></span>
				</div>

				<div className="w-full mx-auto text-center">
					<button
						onClick={signInWithGoogle}
						className="flex items-center justify-center w-full py-3 text-white rounded-full button"
						type="button"
					>
						<FcGoogle className="w-6 h-6 mr-2"></FcGoogle>
						<span>Signup with google</span>
					</button>
				</div>
				<p className="text-xl mt-5 py-5 text-[#5b24ea]">
					Already have an account?{" "}
					<Link to="/login" className="font-semibold text-[#1f1d28]">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Left;
