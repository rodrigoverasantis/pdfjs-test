import React from "react";

function Page(props) {
	const {
		document
	} = props;

	if (!document) {
		return (
			<label>LOADING...</label>
		);
	}

	return (
		<object data={document} type="application/pdf" width="1000px" height="600px">
			<p>This browser does not support PDFs. Sorry. Find out more about pdfjs at <a href="https://github.com/rkusa/pdfjs">Github</a>.</p>
		</object>
	);
}

export default Page;