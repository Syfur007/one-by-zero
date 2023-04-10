import React from "react";
import CardProfileTemplate from "../../Shared/CardProfileTemplate/CardProfileTemplate";
import ThumbnailViewer from "../../Shared/ThumbnailViewer/ThumbnailViewer";

function CardBook({ card }) {
	const { email, createdAt, session, thumbnail, bookName, author, link } = card;
	return (
		<div className="">
			<CardProfileTemplate
				email={email}
				createdAt={createdAt}
				session={session}
			/>
			<ThumbnailViewer
				bookName={bookName}
				author={author}
				thumbnail={thumbnail}
				link={link}
			/>
		</div>
	);
}

export default CardBook;
