import React from "react";
import CountUp from "react-countup";
import { secondary } from "../../../constants/colors";
const CountUpNumber = ({ name, count }) => {
	return (
		<CountUp start={0} end={count} suffix="+" duration={2}>
			{({ countUpRef, start }) => (
				<div
					className={`flex flex-col items-center justify-center w-40 h-20 mx-5 text-white bg-[${secondary}] rounded-md shadow-lg `}
				>
					<span ref={countUpRef} />
					<p>{start}</p>
					<h2 className="uppercase">{name}</h2>
				</div>
			)}
		</CountUp>
	);
};

export default CountUpNumber;
