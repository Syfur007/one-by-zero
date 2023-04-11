import axios from "axios";

const DEFAULT_URL = "https://server.onebyzeroedu.com/";
export const getTotalItems = (data, name) => {
	const items = data?.reduce((acc, item) => acc + item[name], 0);
	return items;
};

export const getRecentBooks = async (
	dept = "Computer Science & Engineering",
	limit = 3
) => {
	try {
		const data = await axios.get(
			DEFAULT_URL + `api/resources/recent/books?limit=${limit}`
		);
		return data?.data;
	} catch (error) {
		return [];
	}
};

export const getRecentQuestions = async (
	dept = "Computer Science & Engineering",
	limit = 3
) => {
	try {
		const data = await axios.get(
			DEFAULT_URL + `api/resources/recent/questions?limit=${limit}`
		);

		return data?.data;
	} catch (error) {
		return [];
	}
};
export const getRecentSlides = async (limit = 3) => {
	try {
		const data = await axios.get(
			DEFAULT_URL + `api/resources/recent/slides?limit=${limit}`
		);

		return data?.data;
	} catch (error) {
		return [];
	}
};
export const getRecentHandNotes = async (limit = 3) => {
	try {
		const data = await axios.get(
			DEFAULT_URL + `api/resources/recent/handNotes?limit=${limit}`
		);

		return data?.data;
	} catch (error) {
		return [];
	}
};
