import axios from "axios";
import { default_url } from "./https";

export const getSessions = async () => {
	try {
		const { data } = await axios.get(`${default_url}/api/session/`);
		return data;
	} catch (er) {
		console.log(er);
	}
};
