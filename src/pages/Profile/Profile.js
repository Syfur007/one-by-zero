import React, { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Profile = () => {
	const { user, setTitle } = useContext(AuthContext);

	useEffect(() => {
		setTitle(`Profile-${user?.displayName} | OneByZero`);
	}, [setTitle, user]);
	return (
		<div className="m-10">
			<h3 className="text-white">{user?.displayName}</h3>
			<h1 className="text-white">{user?.email}</h1>
			<img src={user?.displayImage} alt="" />
		</div>
	);
};

export default Profile;
