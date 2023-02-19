import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { default_url } from "../../../utils/https/https";
import { getTotalItems } from "../../../utils/functions/resourceFunctions";
import Alert from "../../Shared/Alert/Alert";
import CountUpNumber from "../../Shared/CountUp/CountUp";
import Loading from "../../Shared/Loading/Loading";

const CountResources = () => {
	const [error, setError] = useState("");
	const { isLoading, data } = useQuery({
		queryKey: ["resources", "count"],
		queryFn: async () => {
			try {
				const { data } = await axios.get(`${default_url}/api/resources/count`);
				// console.log(data);
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
	const books = getTotalItems(data, "books");
	const questions = getTotalItems(data, "questions");
	const handNotes = getTotalItems(data, "handNotes");
	console.log(slides, questions, handNotes, books);

	return error ? (
		<Alert>{error}</Alert>
	) : (
		<div className="flex flex-row justify-center px-5 py-10">
			<CountUpNumber name="questions" count={questions}></CountUpNumber>
			<CountUpNumber name="books" count={books}></CountUpNumber>
			<CountUpNumber name="handNotes" count={handNotes}></CountUpNumber>
			<CountUpNumber name="slides" count={slides}></CountUpNumber>
		</div>
	);
};

export default CountResources;
