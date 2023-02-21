import React, { useEffect, useState } from "react";
import { secondary } from "../../../constants/colors";
const CountUpNumber = ({ name, value }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (count < value) {
				setCount((count) => count + 1);
			}
		}, 10);
		return () => clearInterval(interval);
	}, [count, value]);

	return (
		<div
			className={`flex flex-col items-center justify-center sm:w-40 w-full mt-5 h-20 mx-5 text-white bg-[${secondary}] rounded-md shadow-lg `}
		>
			<p>{count}+</p>
			<h2 className="uppercase">{name}</h2>
		</div>
	);
};

export default CountUpNumber;
