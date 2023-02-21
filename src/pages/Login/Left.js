import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";
import Alert from "../Shared/Alert/Alert.js";
import Cookies from "js-cookie";
import { DEFAULT_URL_SERVER } from "../../constants/url";
import SigninLoader from "../Shared/Loading/SigninLoader.js";
import axios from "axios";
import { primary } from "../../constants/colors.js";

const Left = () => {
	const navigate = useNavigate();
	const { signIn, handleGoogleSignIn } = useContext(AuthContext);
	const [error, setError] = useState();
	const [signInLoading, setSignInLoading] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data) => {
		setSignInLoading(true);
		const email = watch("email");
		const password = watch("password");

		try {
			//TODO:sign with email and password
			const { user } = await signIn(email, password);
			if (!user) {
				setError("Signin is failed");
				return;
			}
			//TODO: generate token for user

			const { data } = await axios.get(
				`${DEFAULT_URL_SERVER}/api/user/jwt?email=${user?.email}`
			);

			//TODO: set token to cookie
			if (data?.token) {
				Cookies.set("one-by-zero-user-token", data?.token, {
					expires: 30,
					path: "/",
				});
				toast.success("login success");
				setSignInLoading(false);
				navigate("/");
			}

			setError("something wen wrong");
		} catch (error) {
			setSignInLoading(false);
			let message = error.message.split(":")[1];
			setError(message);
		}
	};

	const signInWithGoogle = async () => {
		try {
			// TODO:: signin with google
			const { user } = await handleGoogleSignIn();
			if (!user?.uid) {
				setError("Signin is failed");
				return;
			}

			const createUserIntoMongoDb = {
				email: user?.email,
				phoneNumber: user?.phoneNumber,
				name: user?.displayName,
				image: user?.photoURL,
			};

			// TODO:: create use into mongodb
			const data = await axios.post(
				`${DEFAULT_URL_SERVER}/api/user/`,
				createUserIntoMongoDb
			);

			if (data) {
				//TODO: generate token for user
				const dataToken = (
					await axios.get(
						`${DEFAULT_URL_SERVER}/api/user/jwt?email=${user?.email}`
					)
				).data;
				console.log(dataToken);
				Cookies.set("one-by-zero-user-token", dataToken?.token, {
					expires: 30,
					path: "/",
				});
				//TODO: set token for user
				toast.success("login success");
				navigate("/");
			} else {
				setError("user is not created\n please ,login agin");
			}
			setSignInLoading(false);
		} catch (err) {
			let message = err.message.split(":")[1];
			setError(message);
			console.log(err);
		}
	};

	return (
		<div className="flex-1 md:w-[50%] w-[90%] mx-auto">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=" bg-[#ffff] mx-auto login-form-height  rounded-2xl min-h-[60vh] p-10 lg:w-[65%] w-full m-10"
			>
				{error && <Alert>{error}</Alert>}

				<h1 className={`mx-auto text-2xl text-[${primary}] font-semibold py-5`}>
					Login
				</h1>
				<div className="">
					<input
						type="email"
						placeholder="Email"
						{...register("email", {
							required: "Email should not be empty.",
						})}
						className={`border-gray-300 input placeholder:text-gray-600 w-full pl-5 py-2 focus:border-[${primary}]  outline-none`}
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
						className={`border-gray-300 input placeholder:text-gray-600 w-full pl-5 py-2 focus:border-[${primary}]  outline-none`}
					/>
					<p className="mt-1 text-center text-red-800">
						{errors?.password?.message}
					</p>
				</div>
				<div className="w-full mt-8 ">
					<button
						type="submit"
						className={`w-full button bg-[${primary}] py-2 rounded-full items-center justify-between text-xl flex text-white`}
					>
						<p className="flex-1 text-center">
							{signInLoading ? (
								<div className="flex items-center justify-center">
									<SigninLoader></SigninLoader> <span>Loading.....</span>
								</div>
							) : (
								"Login"
							)}
						</p>
						<p className="p-2 mr-3 text-[#1f1d28] bg-white rounded-full">
							<FaArrowRight></FaArrowRight>
						</p>
					</button>
				</div>
				<div className="flex items-center w-full mx-auto my-3 text-center sm:w-3/4">
					<span className={`w-full block h-[1px] mr-2 bg-[${primary}]`}></span>
					<h4 className={`text-2xl text-[${primary}] `}>OR</h4>
					<span className={`w-full block h-[1px] ml-2 bg-[${primary}]`}></span>
				</div>

				<div className="w-full mx-auto text-center">
					<button
						onClick={signInWithGoogle}
						className="flex items-center justify-center w-full py-3 text-white rounded-full button"
						type="button"
					>
						<FcGoogle className="w-6 h-6 mr-2"></FcGoogle>
						<span>Login with google</span>
					</button>
				</div>
				<p className={`text-xl mt-5 py-5 text-[${primary}]`}>
					New to OneByZero?{" "}
					<Link to="/signup" className="font-semibold text-[#1f1d28]">
						Register
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Left;
