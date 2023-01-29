import axios from "axios";

export const qpi = axios.create({
	baseURL: "https://server.onebyzeroedu.com",
});
