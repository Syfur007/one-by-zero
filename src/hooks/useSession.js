import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const useSession = (value) => {
	const { data: sessionDetails } = useQuery({
		queryKey: ["session", `${value}`],
		queryFn: async () => {
			if (value) {
				try {
					const { data } = await axios.get(
						`https://server.onebyzeroedu.com/api/session/${value}`
					);
					return data;
				} catch (error) {
					console.log(error);
				}
			} else {
				return null;
			}
			// fetch(`https://server.onebyzeroedu.com/api/session/${value}`)
			// 	.then((res) => res.json())
			// 	.then((session) => {
			// 		return session;
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
		},
	});

	return [sessionDetails];
};

export default useSession;
