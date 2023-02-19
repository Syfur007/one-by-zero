import React, { useEffect, useState } from "react";
import { secondary } from "../../../constants/colors";
const CountUpNumber = ({ name, value }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (count < value) {
				setCount((count) => count + 1);
			}
		}, 1);
		return () => clearInterval(interval);
	}, [count, value]);

	return (
		<div
			className={`flex flex-col items-center justify-center w-40 h-20 mx-5 text-white bg-[${secondary}] rounded-md shadow-lg `}
		>
			<p>{count}+</p>
			<h2 className="uppercase">{name}</h2>
		</div>
	);
};

export default CountUpNumber;
