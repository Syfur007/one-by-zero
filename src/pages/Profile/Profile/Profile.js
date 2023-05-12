import React from "react";
import Left from "../Left/Left.js";
import Right from "../Right/Right.js";
import Test from "./Test.js";


const Profile = () => {
	return (
	<div>
			<div className="flex flex-col sm:flex-row">
			<Left></Left>
			<Right></Right>
		    </div>
			<div>
				<Test></Test>
			</div>
	</div>
	);
};

export default Profile;
