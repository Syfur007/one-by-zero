import { Button } from "@material-tailwind/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import default_image from "../../../images/default_image.png";
import "./thumbnail.css";
function ThumbnailViewer({ thumbnail, bookName, author, link }) {
	console.log(link);
	const queryLink = link?.substring(13, link.length - 4);

	return (
		<div className="w-[632px] relative h-[420px]">
			{thumbnail ? (
				<img
					src={`https://server.onebyzeroedu.com/${thumbnail}`}
					className="w-full h-full"
					alt=""
				/>
			) : (
				<img src={default_image} className="w-full h-full" alt="" />
			)}
			<div className="absolute w-full bottom-[.5px] flex justify-between items-center p-3 thumbnail__footer">
				<div>
					<h2 className="font-semibold text-black">{bookName}</h2>
					<h4 className="font-bold text-black">- {author}</h4>
				</div>
				<div>
					<Link to={`/pdf/view`} target="_blank" className="">
						view details
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ThumbnailViewer;
