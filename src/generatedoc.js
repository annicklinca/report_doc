import React from "react";
import './reportPage.css';
import 'jspdf-autotable';
import { Table, TableRow, TableCell, Paragraph, Packer, Document, HeadingLevel, AlignmentType, WidthType, BorderStyle } from "docx";

const PrintDoc = () => {
    const staticData = {
        "Alex Johnson": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
         "Maria Garcia": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " James Smith": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " Patricia Brown": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " Ethan Davis": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        // Add more data as needed
    };

    const createTable = (title, data) => {
        const rows = Object.keys(data);
        const tableRows = [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph("S/N")] }),
                    new TableCell({ children: [new Paragraph("Crimes")] }),
                    new TableCell({ children: [new Paragraph("Central")] }),
                    new TableCell({ children: [new Paragraph("East")] }),
                    new TableCell({ children: [new Paragraph("North")] }),
                    new TableCell({ children: [new Paragraph("South")] }),
                    new TableCell({ children: [new Paragraph("West")] }),
                    new TableCell({ children: [new Paragraph("Total")] }),
                ],
            }),
            ...rows.map((row, index) => {
                const rowData = data[row];
                const total = Object.values(rowData).reduce((acc, val) => acc + val, 0);
                const rowNum = index + 1;
                return new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(String(rowNum))] }),
                        new TableCell({ children: [new Paragraph(row)] }),
                        new TableCell({ children: [new Paragraph(String(rowData.kigali || 0))] }),
                        new TableCell({ children: [new Paragraph(String(rowData.east || 0))] }),
                        new TableCell({ children: [new Paragraph(String(rowData.north || 0))] }),
                        new TableCell({ children: [new Paragraph(String(rowData.south || 0))] }),
                        new TableCell({ children: [new Paragraph(String(rowData.west || 0))] }),
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
    
        // Apply styling to each cell
        tableRows.forEach(row => {
            if (row.children) {
                row.children.forEach(cell => {
                    if (cell.children) {
                        cell.children.forEach(paragraph => {
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
            table: table
        };
    };
    

  const createDocument = () => {
    const table1Data = {
        "Alex Johnson": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        "Maria Garcia": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " James Smith": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " Patricia Brown": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " Ethan Davis": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        // Add more data for table 1 as needed
    };

    const table2Data = {
        "Maria Garcia": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        "Maria Garcia": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " James Smith": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " Patricia Brown": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " Ethan Davis": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        // Add more data for table 2 as needed
    };
    const table3Data = {
        "Alex Johnson": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        "Maria Garcia": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " James Smith": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " Patricia Brown": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        " Ethan Davis": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        // Add more data for table 1 as needed
    };

    const table1 = createTable("Prevalent Crimes", table1Data);
    const table2 = createTable("Prevalent Incidents", table2Data);
    const table3 = createTable("Number of deaths/injuries caused by traffic accidents", table3Data);
    const doc = new Document({
        sections: [
            {
                children: [
                    table1.title,
                    table1.table,
                    table2.title,
                    table2.table,
                    table3.title,
                    table3.table
                ], // Add the titles and tables
            },
        ],
    });

    // Save the file
    Packer.toBlob(doc).then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my_doc.docx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    });
};


    createDocument();

    return null;
};

export default PrintDoc;
