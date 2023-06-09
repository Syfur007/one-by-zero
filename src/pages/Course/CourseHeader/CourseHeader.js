import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import CourseBasicInfo from "../CourseBasicInfo/CourseBasicInfo.js";
import CourseTeacher from "../CourseTeacher/CourseTeacher.js";
import Resources from "../Resources/Resources.js";

const CourseHeader = ({ setElements }) => {
	return (
		<div className="text-white py-10 sm:px-10 px-5 bg-[#1a1a1a] ">
			<div className=" sm:w-[95%] w-full mx-auto z-10">
				<Tabs id="custom-animation" value="1">
					<TabsHeader>
						<Tab key="1" value="1">
							Resources
						</Tab>

						<Tab key="2" value="2">
							Syllabus
						</Tab>
						<Tab key="3" value="3">
							Teachers
						</Tab>
					</TabsHeader>
					<TabsBody
						animate={{
							mount: { y: 0 },
							unmount: { y: 250 },
						}}
					>
						<TabPanel key="1" value="1">
							<Resources setElements={setElements}></Resources>
						</TabPanel>
						<TabPanel key="2" value="2">
							<CourseBasicInfo></CourseBasicInfo>
						</TabPanel>
						<TabPanel key="3" value="3">
							<CourseTeacher></CourseTeacher>
						</TabPanel>
					</TabsBody>
				</Tabs>
			</div>
		</div>
	);
};

export default CourseHeader;
