import React, { useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import Loading from "../Shared/Loading/Loading";
import Alert from "../Shared/Alert/Alert";

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
		const phoneInputWithCountrySelect = watch("phoneInputWithCountrySelect");
		const isValid = isValidPhoneNumber(phoneInputWithCountrySelect);

		if (!isValid) {
			setError("Phonenumber is not valid");
			return;
		}

		createUser(email, password)
			.then((user) => {
				console.log(user);
				handleUpdateUserProfile(name);
				localStorage.setItem(
					"onbyzero-user-phonenumber",
					phoneInputWithCountrySelect
				);
			})
			.catch((err) => {
				console.log(err.message);
				let message = err.message.split(":")[1];
				setError(message);
				setSignupLoading(false);
			});
		// console.log(email, password, name, phoneInputWithCountrySelect);
		// console.log(isValid);
	};

	const handleUpdateUserProfile = (name) => {
		const profile = {
			name,
		};

		updateUserProfile(profile)
			.then(() => {})
			.catch((err) => {
				let message = err.message.split(":")[1];
				setError(message);
				setSignupLoading(false);
			});
		setSignupLoading(false);
		navigate("/");
	};

	const signInWithGoogle = () => {
		handleGoogleSignIn()
			.then((user) => {
				console.log(user);
				navigate("/");
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
					<p className="text-red-800 text-center mt-1">
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
					<p className="text-red-800 text-center mt-1">
						{errors?.email?.message}
					</p>
				</div>
				<div className="mt-6 w-full">
					<PhoneInputWithCountry
						name="phoneInputWithCountrySelect"
						control={control}
						rules={{ required: "Phone Number should not be empty" }}
						defaultCountry="BD"
						placeholder="PhoneNumber"
					/>
					<p className="text-red-800 text-center mt-1">
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
					<p className="text-red-800 text-center mt-1">
						{errors?.password?.message}
					</p>
				</div>
				<div className="w-full mt-8 ">
					<button
						type="submit"
						className="w-full button bg-[#5b24ea] py-2 rounded-full items-center justify-between text-xl flex text-white"
					>
						<p className="text-center flex-1">
							{signupLoading ? (
								<div className="flex items-center justify-center">
									<Loading></Loading> <span>Loading.....</span>
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
				<div className="text-center flex  my-3 sm:w-3/4 w-full mx-auto items-center">
					<span className="w-full block h-[1px] mr-2 bg-[#5b24ea]"></span>
					<h4 className="text-2xl text-[#5b24ea] ">OR</h4>
					<span className="w-full block h-[1px] ml-2 bg-[#5b24ea]"></span>
				</div>

				<div className="text-center w-full mx-auto">
					<button
						onClick={signInWithGoogle}
						className="w-full flex items-center button text-white  rounded-full py-3 justify-center"
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
