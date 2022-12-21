import axios from "axios";

export const qpi = axios.create({
	baseURLL: "http://localhost:8080",
});
