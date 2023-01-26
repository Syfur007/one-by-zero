import React from "react";
import CardProfileTemplate from "../../Shared/CardProfileTemplate/CardProfileTemplate";
import ThumbnailViewer from "../../Shared/ThumbnailViewer/ThumbnailViewer";

function CardBook({ card }) {
	console.log(card);
	const { email, createdAt, session, thumbnail, bookName, author } = card;
	return (
		<div>
			<CardProfileTemplate
				email={email}
				createdAt={createdAt}
				session={session}
			/>
			<ThumbnailViewer
				bookName={bookName}
				author={author}
				thumbnail={thumbnail}
			/>
		</div>
	);
}

export default CardBook;
