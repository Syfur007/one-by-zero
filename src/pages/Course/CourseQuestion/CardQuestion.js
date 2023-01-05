import {
	Card,
	CardBody,
	CardHeader,
	Chip,
	Typography,
} from "@material-tailwind/react";
import "react-photo-view/dist/react-photo-view.css";
import React from "react";

const CardQuestion = ({ question }) => {
	const { link, examName, session, name } = question;
	return (
		<Card className="w-96 bg-[#5D25E9] my-5">
			<CardHeader color="blue" className="relative h-56">
				{!(link && link.includes(".pdf")) && (
					<div>
						{/* <PhotoProvider>
							<PhotoView src={question.link}>
								<img src={question.link} alt="" />
							</PhotoView>
						</PhotoProvider> */}
						<a href={question.link} target="_blank">
							<img src={question.link} className="" alt="" />
						</a>
					</div>
				)}
			</CardHeader>
			<CardBody className="text-center">
				<Typography variant="h5" className="mb-2 text-white">
					{examName && (
						<Chip color="indigo" className="bg-[#3a10a3]" value={examName} />
					)}
					{session && (
						<Chip
							color="indigo"
							className="bg-[#3a10a3] ml-3"
							value={session}
						/>
					)}
				</Typography>
				<Typography variant="h5" className="mb-2 text-white">
					author: {name && <a href="#">{name}</a>}
				</Typography>
			</CardBody>
		</Card>
	);
};

export default CardQuestion;
