import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";
import Alert from "../Shared/Alert/Alert.js";
import SigninLoader from "../Shared/Loading/SigninLoader.js";

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
	const onSubmit = (data) => {
		setSignInLoading(true);
		const email = watch("email");
		const password = watch("password");
		signIn(email, password)
			.then((user) => {
				console.log(user);
				setSignInLoading(false);
				toast.success("login success");
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
				setSignInLoading(false);
				let message = err.message.split(":")[1];
				setError(message);
			});
		console.log(email, password);
	};

	const signInWithGoogle = () => {
		handleGoogleSignIn()
			.then((user) => {
				console.log(user);
				fetch("https://server.onebyzeroedu.com/api/user/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: user?.user?.email,
						phoneNumber: user?.user?.phoneNumber,
						name: user?.user?.displayName,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						setSignInLoading(false);
						toast.success("login success");
						navigate("/");
					})
					.catch((err) => {
						setSignInLoading(false);
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
				className=" bg-[#ffff] mx-auto login-form-height  rounded-2xl min-h-[60vh] p-10 w-[65%] m-10"
			>
				{error && <Alert>{error}</Alert>}

				<h1 className="mx-auto text-2xl text-[#5b24ea] font-semibold py-5">
					Login
				</h1>
				<div className="">
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
							{signInLoading ? (
								<div className="flex items-center justify-center">
									<SigninLoader></SigninLoader> <span>Loading.....</span>
								</div>
							) : (
								"Login"
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
						<span>Login with google</span>
					</button>
				</div>
				<p className="text-xl mt-5 py-5 text-[#5b24ea]">
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
