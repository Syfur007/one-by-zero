import React, { useContext } from "react";
import { DEFAULT_URL_SERVER } from "../../../constants/url";
import default_image from "../../../images/default_image.png";
import { primary, secondary } from "../../../constants/colors";
import "./thumbnail.css";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

function ThumbnailViewer({ thumbnail, bookName, author, link }) {
	const { user } = useContext(AuthContext);
	const fullViewHandler = () => {
		alert("Please,Login to see full view");
		return;
	};
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
					{user?.uid ? (
						<a
							href={`${DEFAULT_URL_SERVER}${link}`}
							rel="noreferrer"
							target="_blank"
						>
							full view
						</a>
					) : (
						<button onClick={fullViewHandler}>full view</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default ThumbnailViewer;
