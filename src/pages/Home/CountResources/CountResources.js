import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo, useState } from "react";
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

	const slides = useMemo(() => {
		return getTotalItems(data, "slides");
	}, [data]);
	const books = useMemo(() => getTotalItems(data, "books"), [data]);
	const questions = useMemo(() => getTotalItems(data, "questions"), [data]);
	const handNotes = useMemo(() => getTotalItems(data, "handNotes"), [data]);
	if (isLoading) {
		return <Loading />;
	}
	console.log(slides, questions, handNotes, books);

	return error ? (
		<Alert>{error}</Alert>
	) : (
		<div className="flex flex-row flex-wrap justify-center px-5 py-10">
			<CountUpNumber name="questions" value={questions}></CountUpNumber>
			<CountUpNumber name="books" value={books}></CountUpNumber>
			<CountUpNumber name="handNotes" value={handNotes}></CountUpNumber>
			<CountUpNumber name="slides" value={slides}></CountUpNumber>
		</div>
	);
};

export default CountResources;
