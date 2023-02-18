import React from "react";
import Left from "../Left/Left.js";
import Right from "../Right/Right.js";

const Profile = () => {
	return (
		<div className="flex flex-col sm:flex-row">
			<Left></Left>
			<Right></Right>
		</div>
	);
};

export default Profile;
