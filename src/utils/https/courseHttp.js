import axios from "axios";
import { default_url } from "./https";

export const getCourses = async (courseData) => {
	console.log(courseData);
	try {
		const { data } = await axios.post(`${default_url}/api/course/`, courseData);
		console.log(data);
		return data;
	} catch (er) {
		console.log(er);
	}
};
