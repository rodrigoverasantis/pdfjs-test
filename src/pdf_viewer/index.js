import React, { useState, useEffect } from "react";
import Page from "./page";
import { GenerarPDF } from "./document_generator";

function Index(props) {
	const [Document, SetDocument] = useState(null);

	useEffect(() => {
		GenerarPDF()
			.then(doc => doc.asBuffer())
			.then(buffer => new Blob([buffer], { type: 'application/pdf' }))
			.then(blob => URL.createObjectURL(blob))
			.then(url => SetDocument(url))
			.catch(error => {
				console.error(error);
				SetDocument(null);
			});
	}, []);

	return (
		<Page
			document={Document}
		/>
	);
}

export default Index;