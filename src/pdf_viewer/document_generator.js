//https://www.npmjs.com/package/pdfjs

import PDF from "pdfjs";

let document = new PDF.Document();

export const GenerarPDF = async () => {
	try {
		await SetHeader();
		SetFooter();

		var cell = document.cell({ paddingBottom: 0.5 * PDF.cm })
		cell.text('Features:', { fontSize: 16 })
		cell.text({ fontSize: 14, lineHeight: 1.35 })
			.add('-')
			.add('different', { color: 0xf8dc3f })
			.add('font')
			.add('styling', { underline: true })
			.add('options', { fontSize: 9 })
		cell.text('- Images (JPEGs, other PDFs)')
		cell.text('- Tables (fixed layout, header row)')
		cell.text('- AFM fonts and')
		cell.text('- OTF font embedding (as CID fonts, i.e., support for fonts with large character sets)')
		cell.text('- Add existing PDFs (merge them or add them as page templates)')

		document.cell({ paddingBottom: 0.5 * PDF.cm }).text()
			.add('For more information visit the')
			.add('Documentation', {
				link: 'https://github.com/rkusa/pdfjs/tree/master/docs',
				underline: true,
				color: 0x569cd6
			})

		var table = document.table({
			widths: [1.5 * PDF.cm, 1.5 * PDF.cm, null, 2.5 * PDF.cm, 2.5 * PDF.cm],
			borderHorizontalWidths: function (i) { return i < 2 ? 1 : 0.1 },
			padding: 5
		})

		var tr = table.header()
		tr.cell('#')
		tr.cell('Unit')
		tr.cell('Subject')
		tr.cell('Price', { textAlign: 'right' })
		tr.cell('Total', { textAlign: 'right' })

		function addRow(qty, name, desc, price) {
			var tr = table.row()
			tr.cell(qty.toString())
			tr.cell('pc.')

			var article = tr.cell().text()
			article.add(name)
				.br()
				.add(desc, { fontSize: 11, textAlign: 'justify' })

			tr.cell(price.toFixed(2) + ' €', { textAlign: 'right' })
			tr.cell(price, { textAlign: 'right' })
		}

		let response = await fetch("https://cat-fact.herokuapp.com/facts");
		let json = await response.json();
		console.log(json);

		Array.from(json.all).forEach(d => {
			if (d.user) {
				addRow(d.type, `${d.user.name.first} ${d.user.name.last}`, d.text, d.upvotes);
			}
		});
		return document;
	} catch (error) {
		console.error(error);
	}
}

async function SetHeader() {
	try {
		let image = await fetch("./images/logo.jpg");
		let imageBuffer = await image.arrayBuffer();
		let logo = new PDF.Image(imageBuffer);
		let headerRow = document.header()
			.table({ widths: ["*", "*", "*"], paddingBottom: 1 * PDF.cm })
			.row();

		headerRow.cell()
			.image(logo, { height: 2 * PDF.cm, align: "left" });

		headerRow.cell()
			.text({
				textAlign: "center",
			})
			.add("Informe Genérico de Prueba")
			.br()
			.add("Información adicional", {
				fontSize: 8,
			});

		headerRow.cell()
			.image(logo, {
				height: 2 * PDF.cm,
				align: "right",
			});
	} catch (error) {
		console.error(error);
	}
}

function SetFooter() {
	try {
		document.footer()
			.pageNumber((current, total) => `${current} / ${total}`, { textAlign: "center" });
	} catch (error) {
		console.error(error);
	}
}