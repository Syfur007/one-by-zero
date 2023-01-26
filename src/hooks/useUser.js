import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser = (email) => {
	const { data: userDetails, isLoading } = useQuery({
		queryKey: ["user", `${email}`],
		queryFn: async () => {
			if (email) {
				try {
					const { data } = await axios.get(
						`https://server.onebyzeroedu.com/api/user?email=${email}`
					);
					return data;
				} catch (error) {
					console.log(error);
				}
			} else {
				return null;
			}
		},
	});

	return [userDetails?.userRole, isLoading, userDetails];
};

export default useUser;
