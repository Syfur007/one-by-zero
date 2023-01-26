import React from "react";
import CardProfileTemplate from "../../Shared/CardProfileTemplate/CardProfileTemplate";
import ThumbnailViewer from "../../Shared/ThumbnailViewer/ThumbnailViewer";

function CardSlide({ card }) {
	// console.log(card);
	const { email, createdAt, session, thumbnail } = card;
	return (
		<div>
			<CardProfileTemplate
				email={email}
				createdAt={createdAt}
				session={session}
			/>
			<ThumbnailViewer thumbnail={thumbnail} />
		</div>
	);
}

export default CardSlide;
