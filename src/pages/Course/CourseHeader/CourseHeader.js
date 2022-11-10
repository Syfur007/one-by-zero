import React from "react";
import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import Resources from "../Resources/Resources";

const CourseHeader = () => {
	return (
		<div className="bg-purple-900 text-white py-10 h-[70vh]">
			<div className=" w-[80%] mx-auto">
				<Tabs id="custom-animation" value="1">
					<TabsHeader className="z-10">
						<Tab key="1" value="1" className="">
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
							<Resources></Resources>
						</TabPanel>
						<TabPanel key="2" value="2">
							CSss
						</TabPanel>
					</TabsBody>
				</Tabs>
			</div>
		</div>
	);
};

export default CourseHeader;
