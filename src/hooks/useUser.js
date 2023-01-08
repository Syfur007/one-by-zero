import { useEffect, useState } from "react";

const useUser = (email) => {
	const [userDetails, setUserDetails] = useState("");
	const [userLoading, setUserLoading] = useState(true);

	useEffect(() => {
		if (email) {
			fetch(`https://server.onebyzeroedu.com/api/user?email=${email}`)
				.then((res) => res.json())
				.then((user) => {
					setUserDetails(user);
					setUserLoading(false);
				})
				.catch((err) => {
					setUserLoading(false);
					console.log(err);
				});
		}
	}, [email]);
	return [userDetails?.userRole, userLoading, userDetails];
};

export default useUser;
