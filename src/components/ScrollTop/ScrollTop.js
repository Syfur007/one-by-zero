import { motion } from "framer-motion";
import React from "react";
import { FaChevronUp } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { info, secondary } from "../../constants/colors";

const ScrollTop = ({ isVisible, setIsVisible }) => {
	const scrollToTop = () => {
		console.log("top");

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<motion.button
			initial={{ x: "100%" }}
			animate={{ x: 0 }}
			transition={{ duration: 0.3 }}
			size="sm"
			className={`element-to-animate bg-[${secondary}] hover:bg-gray-800 rounded-md px-3 py-2 fixed top-[90vh] right-10`}
			onClick={scrollToTop}
		>
			<FaChevronUp className="w-5 h-5 text-white" />
		</motion.button>
	);
};

export default ScrollTop;
