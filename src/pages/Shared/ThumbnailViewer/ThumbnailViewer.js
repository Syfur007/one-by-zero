import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import default_image from "../../../images/default_image.png";

function ThumbnailViewer({ thumbnail }) {
	return (
		<div>
			{thumbnail ? (
				<img
					src={`https://server.onebyzeroedu.com/${thumbnail}`}
					className="w-[632px] h-[420px]"
					alt=""
				/>
			) : (
				<img src={default_image} className="w-[632px] h-[420px]" alt="" />
			)}
		</div>
	);
}

export default ThumbnailViewer;
