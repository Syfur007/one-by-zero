import React, { useContext, useEffect, useState } from "react";
import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import Resources from "../Resources/Resources";
import { CourseContext } from "../../../contexts/CourseProvider/CourseProvider";

const CourseHeader = () => {
	const [course, setCourse] = useState(null);
	const { mycourseInfo } = useContext(CourseContext);

	useEffect(() => {
		const fetchCourse = async () => {
			const res = await fetch(
				`http://localhost:8080/resources/course/questions`,
				{
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(mycourseInfo),
				}
			);
			const data = await res.json();
			localStorage.setItem("one-by-zero-course", JSON.stringify(data));
			setCourse(data);
			console.log(data);
		};
		fetchCourse();
	}, [mycourseInfo]);
	return (
		<div className="text-white py-10 bg-[#150e27] ">
			<div className=" w-[80%] mx-auto z-10">
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
							<Resources course={course}></Resources>
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
