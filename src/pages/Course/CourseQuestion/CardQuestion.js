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
	console.log(link);
	return (
		<div className="">
			{link && link.includes(".pdf") ? (
				<div className="relative p-2 mx-auto ">
					<iframe
						src={`https://server.onebyzeroedu.com${link}`}
						title="pdf file"
						frameborder="0"
						className="w-full min-h-[520px] rounded-md"
					></iframe>
					<div className="absolute bottom-[20px] left-[50%] translate-x-[-50%] text-red-700 font-bold cursor-pointer hover:text-red-900 z-10">
						<a
							href={`https://server.onebyzeroedu.com${link}`}
							rel="noreferrer"
							target="_blank"
						>
							full view
						</a>
					</div>
				</div>
			) : (
				<div className="  h-[500px] p-2 mx-auto">
					<div className="shadow-xl bg-[#5D25E9] rounded-md card">
						<figure>
							<a href={question.link} target="_blank" rel="noreferrer">
								<img src={question.link} className="w-full h-[400px]" alt="" />
							</a>
						</figure>
						<div className="card-body">
							<h2 className="card-title">
								Shoes!
								<div className="badge badge-secondary">NEW</div>
							</h2>
							<div className="justify-end card-actions">
								<div className="badge badge-outline">Fashion</div>
								<div className="badge badge-outline">Products</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CardQuestion;
