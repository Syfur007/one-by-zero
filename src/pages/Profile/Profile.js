import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Profile = () => {
	const { user } = useContext(AuthContext);
	return (
		<div className="m-10">
			<h1>{user?.email}</h1>
		</div>
	);
};

export default Profile;
