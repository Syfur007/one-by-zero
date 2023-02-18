import React from "react";
import CardProfileTemplate from "../CardProfileTemplate/CardProfileTemplate";
import ThumbnailViewer from "../ThumbnailViewer/ThumbnailViewer";

const CardTemplate = ({ card }) => {
	const { email, createdAt, session, thumbnail, author, bookName, link } = card;
	return (
		<div className="mt-3">
			<CardProfileTemplate
				email={email}
				createdAt={createdAt}
				session={session}
			/>
			<ThumbnailViewer
				thumbnail={thumbnail}
				author={author}
				bookName={bookName}
				link={link}
			/>
		</div>
	);
};

export default CardTemplate;
