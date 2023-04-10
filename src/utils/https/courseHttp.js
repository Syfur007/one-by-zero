import axios from "axios";
import { default_url } from "./https";

export const getCourses = async () => {
	try {
		const { data } = await axios.get(`${default_url}/api/course/`);
		return data;
	} catch (er) {
		console.log(er);
	}
};
