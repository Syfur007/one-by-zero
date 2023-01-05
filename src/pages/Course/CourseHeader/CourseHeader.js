import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import Resources from "../Resources/Resources.js";

const CourseHeader = ({ setElements }) => {
	return (
		<>
			<div className="text-white py-10 bg-[#5D25E9] ">
				<div className=" sm:w-[80%] w-[95%] mx-auto z-10">
					<Tabs id="custom-animation" style={{ zIndex: 1 }} value="1">
						<TabsHeader className="z-10">
							<Tab key="1" value="1" className="z-10">
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
								CSss
							</TabPanel>
						</TabsBody>
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default CourseHeader;
