import axios from "axios";
import { default_url } from "./https";

export const getUsers = async () => {
	try {
		const { data } = await axios.get(`${default_url}/api/user/all`);
		console.log(data);
		return data;
	} catch (er) {
		console.log(er);
	}
};

export const addUserAsModerator = async (id) => {
	try {
		const { data } = await axios.put(
			`${default_url}/api/user/addasmoderator/${id}`
		);
		return data;
	} catch (err) {
		console.log(err);
	}
};
