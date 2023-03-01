import Cookies from "js-cookie";

export const getCookie = () => {
	return Cookies.get("one-by-zero-user-token");
};
