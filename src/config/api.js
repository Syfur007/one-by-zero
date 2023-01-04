import axios from "axios";

export const qpi = axios.create({
	baseURLL: "https://server.onebyzeroedu.com",
});
