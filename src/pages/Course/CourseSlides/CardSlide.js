import React from "react";
import CardProfileTemplate from "../../Shared/CardProfileTemplate/CardProfileTemplate";
import ThumbnailViewer from "../../Shared/ThumbnailViewer/ThumbnailViewer";

function CardSlide({ card, setEditSlide }) {
	const { email, createdAt, session, thumbnail, author, bookName, link } = card;

	return (
		<div className="">
			<CardProfileTemplate
				email={email}
				createdAt={createdAt}
				session={session}
				card={card}
				setUpdateCard={setEditSlide}
			/>
			<ThumbnailViewer
				thumbnail={thumbnail}
				author={author}
				bookName={bookName}
				link={link}
			/>
		</div>
	);
}

export default CardSlide;
