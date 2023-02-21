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
			
		},
	});

	return [sessionDetails];
};

export default useSession;
