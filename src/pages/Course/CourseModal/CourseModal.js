import { Fragment, useContext } from "react";
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";
import "../course.config.css";
import { FaArrowLeft, FaBackward } from "react-icons/fa";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider.js";
const CourseModal = ({ elements }) => {
	const { open, handleOpen } = useContext(CourseContext);

	return (
		<div>
			<Fragment>
				<Dialog open={open} size={"xxl"} className="" handler={handleOpen}>
					<DialogBody divider className="bg-[#1a1a1a] p-10 relative text-white">
						<p className="fixed z-50 cursor-pointer top-2 left-2">
							<FaArrowLeft
								onClick={() => handleOpen(false)}
								className="w-6 h-6 text-yellow-700 hover:text-yellow-900"
							/>
						</p>
						{elements}
					</DialogBody>
					<DialogFooter className="bg-[#282828]">
						<Button
							variant="text"
							color="red"
							onClick={() => handleOpen(false)}
							className="mr-1"
						>
							<span>Close</span>
						</Button>
					</DialogFooter>
				</Dialog>
			</Fragment>
		</div>
	);
};

export default CourseModal;
