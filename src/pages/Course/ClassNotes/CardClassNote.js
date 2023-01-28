import React from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Link } from "react-router-dom";
import CardProfileTemplate from "../../Shared/CardProfileTemplate/CardProfileTemplate";
import ThumbnailViewer from "../../Shared/ThumbnailViewer/ThumbnailViewer";
const CardClassNote = ({ note }) => {
	const { link, email, createdAt, session, author, bookName, thumbnail } = note;
	const bookNameFromLink = link.substring(13, link.length);
	console.log(bookNameFromLink);

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
				link={link}
			/>
		</div>
	);
};

export default CardClassNote;
