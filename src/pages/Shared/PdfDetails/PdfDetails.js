import React from "react";
import { useSearchParams } from "react-router-dom";
import PDfDetailsViewer from "../PdfDetailsViewer/PdfDetailsViewer";

function PdfDetails() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q");
	const file = `./uploads/pdf/${query}.pdf`;
	console.log(file);
	return (
		<div className="pt-[90px]">
			<h1>anis molla</h1>

			<PDfDetailsViewer file={file} />
		</div>
	);
}

export default PdfDetails;
