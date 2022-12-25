import { useEffect, useState } from "react";

const useRole = (email) => {
	const [role, setRole] = useState("");
	const [roleLoading, setRoleLoading] = useState(true);
	useEffect(() => {
		if (email) {
			fetch(`http://localhost:8080/api/user?email=${email}`)
				.then((res) => res.json())
				.then((user) => {
					console.log(user);
					setRole(user?.userRole);
					setRoleLoading(false);
				})
				.catch((err) => {
					setRoleLoading(false);
					console.log(err);
				});
		}
	}, [email]);

	return [role, roleLoading];
};

export default useRole;
