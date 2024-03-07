import React from "react";
import './reportPage.css';
import 'jspdf-autotable';
import { Table, TableRow, TableCell, Paragraph, Packer, Document } from "docx";

const PrintDoc = () => {
    const staticData = {
        "Alice Wonderson": {
            "east": 10,
            "west": 15,
            "north": 20,
            "south": 5,
            "kigali": 25
        },
        // Add more data as needed
    };

    const createTable = () => {
        const rows = Object.keys(staticData);
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
                const rowData = staticData[row];
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

        const table = new Table({ rows: tableRows });
        return table;
    };

    const createDocument = () => {
        const table = createTable();
        const doc = new Document({ sections: [{ children: [table] }] });

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
