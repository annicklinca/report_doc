import React from "react";
import "./reportPage.css";
import "jspdf-autotable";
import {
  Table,
  TableRow,
  TableCell,
  Paragraph,
  Packer,
  Document,
  HeadingLevel,
  AlignmentType,
  WidthType,
  BorderStyle,
} from "docx";

const createTable = (title, data, headers) => {
  const rows = Object.keys(data);
  const tableRows = [
    new TableRow({
      children: headers.map(
        (header) =>
          new TableCell({
            children: [new Paragraph({ text: header, bold: true })],
          })
      ),
    }),
    ...rows.map((row, index) => {
      const rowData = data[row];
      const total = Object.values(rowData).reduce((acc, val) => acc + val, 0);
      const rowNum = index + 1;
      return new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(String(rowNum))] }),
          new TableCell({ children: [new Paragraph(row)] }),
          ...headers
            .slice(2)
            .map(
              (header) =>
                new TableCell({
                  children: [new Paragraph(String(rowData[header] || 0))],
                })
            ),
          new TableCell({ children: [new Paragraph(String(total))] }),
        ],
      });
    }),
  ];

  const table = new Table({
    rows: tableRows,
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    borders: {
      inside: {
        style: BorderStyle.SINGLE,
        size: 1,
      },
      outside: {
        style: BorderStyle.SINGLE,
        size: 1,
      },
    },
  });

  // Apply bold styling to all header cells
  headers.forEach((header) => {
    table.getCell(
      0,
      headers.indexOf(header)
    ).children[0].children[0].bold = true;
  });

  // Apply alignment and spacing to each cell
  tableRows.forEach((row) => {
    if (row.children) {
      row.children.forEach((cell) => {
        if (cell.children) {
          cell.children.forEach((paragraph) => {
            paragraph.alignment = AlignmentType.CENTER;
            paragraph.spacing = { after: 120 };
          });
        }
      });
    }
  });

  return {
    title: new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 200,
      },
      bold: true,
      size: {
        fontSize: 24,
      },
    }),
    table: table,
  };
};

const PrintDoc = () => {
  const createDocument = () => {
    // Define data for table 1
    const table1Data = {
      "Alex Johnson": {
        east: 10,
        west: 15,
        north: 20,
        south: 5,
        kigali: 25,
      },
      // Add more data as needed
    };

    // Define data for table 2
    const table2Data = {
      "Maria Garcia": {
        east: 10,
        west: 15,
        north: 20,
        south: 5,
        kigali: 25,
      },
      // Add more data as needed
    };

    // Define data for table 3
    const table3Data = {
      "James Smith": {
        east: 10,
        west: 15,
        north: 20,
        south: 5,
        kigali: 25,
      },
      // Add more data as needed
    };

    // Define data for table 4
    const table4Data = {
      // Add data for table 4
    };

    // Define data for table 5
    const table5Data = {
      // Add data for table 5
    };

    // Create tables using the createTable function
    const table1 = createTable("Prevalent Crimes", table1Data, [
      "S/N",
      "Crimes",
      "Central",
      "East",
      "North",
      "South",
      "West",
    ]);
    const table2 = createTable("Prevalent Incidents", table2Data, [
      "S/N",
      "Incidents",
      "Category A",
      "Category B",
      "Category C",
    ]);
    const table3 = createTable(
      "Number of deaths/injuries caused by traffic accidents",
      table3Data,
      ["S/N", "Location", "Fatalities", "Injuries"]
    );
    const table4 = createTable("Another Table", table4Data, [
      "Header1",
      "Header2",
      "Header3",
    ]);
    const table5 = createTable("Yet Another Table", table5Data, [
      "HeaderA",
      "HeaderB",
      "HeaderC",
      "HeaderD",
    ]);

    // Create the document
    const doc = new Document({
      sections: [
        {
          children: [
            table1.title,
            table1.table,
            table2.title,
            table2.table,
            table3.title,
            table3.table,
            table4.title,
            table4.table,
            table5.title,
            table5.table,
          ],
        },
      ],
    });

    // Save the file
    Packer.toBlob(doc).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.docx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  createDocument();

  return null;
};

export default PrintDoc;
