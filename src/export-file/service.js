const xl = require('excel4node');
const Printer = require('pdfmake');
const fonts = require('pdfmake/build/vfs_fonts');

const wb = new xl.Workbook();
const ws = wb.addWorksheet('Sheet 1');
const style = wb.createStyle({
  font: {
    color: '#FF0800',
    size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});

const toExcel = (res) => {
  // Set value of cell A1 to 100 as a number type styled with paramaters of style
  ws.cell(1, 1)
    .number(700)
    .style(style);

  // Set value of cell B1 to 200 as a number type styled with paramaters of style
  ws.cell(1, 2)
    .string('suekkkk')
    .style(style);

  // Set value of cell C1 to a formula styled with paramaters of style
  ws.cell(1, 3)
    .formula('A1 + B1')
    .style(style);

  // Set value of cell A2 to 'string' styled with paramaters of style
  ws.cell(2, 1)
    .string('string')
    .style(style);

  // eslint-disable-next-line max-len
  // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
  ws.cell(3, 1)
    .bool(true)
    .style(style)
    .style({ font: { size: 14 } });

  wb.write('ExcelFile.xlsx', res);
};

const toPdf = (res) => {
  const fontDescriptors = {
    Roboto: {
      normal: Buffer.from(fonts.pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
      bold: Buffer.from(fonts.pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
      italics: Buffer.from(fonts.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
      bolditalics: Buffer.from(fonts.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
    },
  };

  const printer = new Printer(fontDescriptors);
  const chunks = [];
  const docDefinition = {
    content: [
      // if you don't need styles, you can use a simple string to define a paragraph
      'This is a standard paragraph, using default style',
      // using a { text: '...' } object lets you set styling properties
      {
        text: 'This paragraph will have a bigger font',
        fontSize: 15,
      },
      // if you set the value of text to an array instead of a string, you'll be able
      // to style any part individually
      {
        text: [
          'This paragraph is defined as an array of elements to make it possible to ',
          {
            text: 'restyle part of it and make it bigger ',
            fontSize: 15,
          },
          'than the rest.',
        ],
      },
    ],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  pdfDoc.on('data', (chunk) => {
    chunks.push(chunk);
  });

  pdfDoc.on('end', () => {
    const result = Buffer.concat(chunks);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-disposition', 'attachment; filename=report.pdf');
    res.send(result);
  });

  pdfDoc.on('error', (err) => {
    res.status(501).send(err);
  });

  pdfDoc.end();
};

module.exports = {
  toExcel,
  toPdf,
};
