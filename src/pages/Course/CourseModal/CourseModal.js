import { Fragment, useContext } from "react";
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";
import "../course.config.css";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";
const CourseModal = ({ elements }) => {
	const { open, handleOpen } = useContext(CourseContext);

	return (
		<div>
			<Fragment>
				<Dialog open={open} size={"xxl"} className="" handler={handleOpen}>
					<DialogBody divider className="bg-[#150a31] p-10 text-white">
						{elements}
					</DialogBody>
					<DialogFooter className="bg-[#150E27]">
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
