import axios from "axios";
import { default_url } from "./https";

export const getCourses = async () => {
	try {
		const { data } = await axios.get(`${default_url}/api/course/`);
		console.log(data);
		return data;
	} catch (er) {
		console.log(er);
	}
};
