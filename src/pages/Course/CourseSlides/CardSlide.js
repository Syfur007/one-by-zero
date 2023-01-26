import React from "react";
import CardProfileTemplate from "../../Shared/CardProfileTemplate/CardProfileTemplate";
import ThumbnailViewer from "../../Shared/ThumbnailViewer/ThumbnailViewer";

function CardSlide({ card }) {
	const { email, createdAt, session, thumbnail, author, bookName } = card;

	return (
		<div>
			<CardProfileTemplate
				email={email}
				createdAt={createdAt}
				session={session}
			/>
			<ThumbnailViewer
				thumbnail={thumbnail}
				author={author}
				bookName={bookName}
			/>
		</div>
	);
}

export default CardSlide;
