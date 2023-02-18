import { Button } from "@material-tailwind/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import default_image from "../../../images/default_image.png";
import { primary, secondary } from "../../../constants/colors";
import "./thumbnail.css";
function ThumbnailViewer({ thumbnail, bookName, author, link }) {
	console.log(link);
	const queryLink = link?.substring(13, link.length - 4);

	return (
		<div className="w-full relative h-[350px]">
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

				<div
					className={`z-10 text-sm font-medium text-white cursor-pointer right-2 bg-[${primary}] px-4 py-2 rounded-md hover:bg-[${secondary}] `}
				>
					<a
						href={`${DEFAULT_URL_SERVER}${link}`}
						rel="noreferrer"
						target="_blank"
					>
						full view
					</a>
				</div>
			</div>
		</div>
	);
}

export default ThumbnailViewer;
