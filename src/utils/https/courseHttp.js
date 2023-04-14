import axios from "axios";
import { default_url } from "./https";

export const getCourses = async (courseData) => {
	try {
		const { data } = await axios.get(`${default_url}/api/course/`, courseData);
		return data;
	} catch (er) {
		console.log(er);
	}
};
