import React from "react";
import default_image from "../../../images/default_image.png";
import "./thumbnail.css";
function ThumbnailViewer({ thumbnail, bookName, author }) {
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
			<div className="absolute w-full bottom-[.5px] p-3 thumbnail__footer">
				<h2 className="text-black font-semibold">{bookName}</h2>
				<h4 className="text-black font-bold">- {author}</h4>
			</div>
		</div>
	);
}

export default ThumbnailViewer;
