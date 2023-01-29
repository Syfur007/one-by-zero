import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import CourseBasicInfo from "../CourseBasicInfo/CourseBasicInfo.js";
import Resources from "../Resources/Resources.js";

const CourseHeader = ({ setElements }) => {
	return (
		<div className="text-white py-10 sm:px-10 px-5 bg-[#1a1a1a] ">
			<div className=" sm:w-[80%] w-full mx-auto z-10">
				<Tabs id="custom-animation" value="1">
					<TabsHeader>
						<Tab key="1" value="1">
							Resources
						</Tab>

						<Tab key="2" value="2">
							Basic Info
						</Tab>
						<Tab key="3" value="3">
							Teacher
						</Tab>
						<Tab key="4" value="4">
							Discussion
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
					</TabsBody>
				</Tabs>
			</div>
		</div>
	);
};

export default CourseHeader;
