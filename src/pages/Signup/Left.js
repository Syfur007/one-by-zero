import React, { useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";
import Alert from "../Shared/Alert/Alert.js";
import SigninLoader from "../Shared/Loading/SigninLoader.js";

const Left = () => {
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const {
		register,
		handleSubmit,
		watch,

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

		createUser(email, password)
			.then((user) => {
				handleUpdateUserProfile(
					name,
					"https://i.ibb.co/fp92Ldr/icons8-person-90.png"
				);
				// save data to mongodb
				fetch("https://server.onebyzeroedu.com/api/user/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						name: name,
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
				console.log(user?.user?.email, user?.user?.phoneNumber);
				fetch("https://server.onebyzeroedu.com/api/user/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: user?.user?.email,
						name: user?.user?.displayName,
						phoneNumber: user?.user?.phoneNumber,
						image: user?.user?.photoURL,
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
		<div className="flex-1 md:w-[50%] w-[90%] mx-auto">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=" bg-[#ffff] mx-auto login-form-height  rounded-2xl  p-10 lg:w-[70%] w-full m-10"
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
