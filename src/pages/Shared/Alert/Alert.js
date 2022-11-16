import React, { useState } from "react";

const Alert = ({ children }) => {
	return (
		<>
			<div
				class="bg-red-100 w-full border border-red-400 text-red-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<p class="">{children}</p>
			</div>
		</>
	);
};

export default Alert;
