import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import Alert from "../../Shared/Alert/Alert";
import Loading from "../../Shared/Loading/Loading";
import { primary, secondary } from "../../../constants/colors";
import Items from "../Items/Items";
import { getTotalItems } from "../../../utils/functions/profileFunctions";

const Right = () => {
	const { user, loading } = useContext(AuthContext);
	const [error, setError] = useState("");
	const [active, setActive] = useState("questions");
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const queryEmail = searchParams.get("q");

	if (!user && !loading) {
		navigate("/login");
	}
	const { isLoading, data } = useQuery({
		queryKey: ["resources", queryEmail ? queryEmail : user?.email],
		queryFn: async () => {
			try {
				const { data } = await axios.get(
					`${DEFAULT_URL_SERVER}/api/resources/profile?email=${
						queryEmail ? queryEmail : user?.email
					}`,
					{
						headers: {
							authorization: `Bearer ${Cookies.get("one-by-zero-user-token")}`,
						},
					}
				);
				console.log(data);
				setError("");
				return data;
			} catch (error) {
				const errorMessage = error?.response?.data?.message || error.message;
				setError(errorMessage);
				return [];
			}
		},
	});
	if (isLoading) {
		return <Loading />;
	}
	const slides = getTotalItems(data, "slides");
	const questions = getTotalItems(data, "questions");
	const handNotes = getTotalItems(data, "handNotes");
	const books = getTotalItems(data, "books");
	console.log(slides, questions, handNotes, books);

	return (
		<div className="w-full px-5 pb-4 my-5 sm:pt-24 sm:w-1/2">
			{error ? (
				<Alert>{error}</Alert>
			) : (
				data && (
					<>
						<div className={`tabs bg-[${secondary}] py-2 tabs-boxed`}>
							<button
								className={`text-white tab ${
									active === "questions" && "tab-active"
								}`}
								onClick={() => setActive("questions")}
							>
								Questions (<span className="">{questions}</span>)
							</button>
							<button
								className={`text-white tab ${
									active === "books" && "tab-active"
								}`}
								onClick={() => setActive("books")}
							>
								Books (<span className="">{books}</span>)
							</button>
							<button
								className={`text-white tab ${
									active === "handNotes" && "tab-active"
								}`}
								onClick={() => setActive("handNotes")}
							>
								HandNotes (<span className="">{handNotes}</span>)
							</button>
							<button
								className={`text-white tab ${
									active === "slides" && "tab-active"
								}`}
								onClick={() => setActive("slides")}
							>
								Slides (<span className="">{slides}</span>)
							</button>
						</div>
						<div className="mt-2">
							{data &&
								data?.map((item) => (
									<Items items={item[active]} active={active}></Items>
								))}
						</div>
					</>
				)
			)}
		</div>
	);
};

export default Right;
