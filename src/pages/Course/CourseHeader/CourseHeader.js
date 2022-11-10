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
	const data = [
		{
			label: "HTML",
			value: "html",
			desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
		},
		{
			label: "React",
			value: "react",
			desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
		},

		{
			label: "Vue",
			value: "vue",
			desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're 
      constantly trying to express ourselves and actualize our dreams.`,
		},

		{
			label: "Angular",
			value: "angular",
			desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
		},

		{
			label: "Svelte",
			value: "svelte",
			desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're 
      constantly trying to express ourselves and actualize our dreams.`,
		},
	];
	return (
		<div className="bg-purple-900 text-white py-10 h-[70vh]">
			<div className=" w-[80%] mx-auto">
				<Tabs id="custom-animation" value="1">
					<TabsHeader className="">
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
