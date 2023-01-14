import { useEffect, useState } from "react";

const useSession = (value) => {
	const [sessionDetails, setSessionDetails] = useState("");

	useEffect(() => {
		if (value) {
			fetch(`https://server.onebyzeroedu.com/api/session/${value}`)
				.then((res) => res.json())
				.then((session) => {
					console.log(session);
					setSessionDetails(session);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [value]);
	return [sessionDetails];
};

export default useSession;
