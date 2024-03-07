import React, { useRef, useState } from "react";
import './reportPage.css';
import 'jspdf-autotable';
import { saveAs } from 'file-saver'; // Library to save files
import { jsPDF } from 'jspdf';
import Docxtemplater from 'docxtemplater';
import MyDatePicker from './datepicker';
import Choosedate from "./datepicker2";
import {Document, HeadingLevel, TextRun, Packer, Paragraph, Table, Tablecell, TableRow, VerticalAlign } from "docx";
import PrintDoc from "./generatedoc";
import imag1 from "./RNP_LOGO.png"
const PrintPage = () => {
    const contentRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleDownload = () => {
      if (selectedOption === 'pdf') {
        generatePDF();
      } else if (selectedOption === 'word') {
        PrintDoc();
      } else {
        alert('Please select an option.');
      }
    };

    // Inside generatePDF function
    const generatePDF = () => {
      const doc = new jsPDF();
  
      // Title
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 255); // Set text color to blue
      doc.text("REPORT ", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  
      // Iterate over each table
      const tables = contentRef.current.querySelectorAll('.overflow-x-auto table');
      let startY = 40;
  
      tables.forEach((table, index) => {
          const tableTitleElement = table.previousElementSibling;
          if (tableTitleElement && tableTitleElement.tagName === 'H2') {
              const tableTitle = tableTitleElement.textContent; // Get the title of the table
              // Add title
              doc.setFontSize(16);
              doc.setTextColor(0, 0, 0); // Set text color to black
              doc.text(tableTitle, 10, startY + 10);
          }
  
          // Get table data
          const tableData = [];
          const tableRows = table.querySelectorAll('tr');
          tableRows.forEach((row) => {
              const rowData = [];
              row.querySelectorAll('th, td').forEach((cell) => {
                  rowData.push(cell.textContent.trim());
              });
              tableData.push(rowData);
          });
  
          // Check if there's enough space for the table
          const pageHeight = doc.internal.pageSize.getHeight();
          const remainingHeight = pageHeight - startY;
          const tableHeight = tableData.length * 10; // Approximate height of each row
          if (tableHeight > remainingHeight) {
              doc.addPage();
              startY = 20;
          }
  
          // Add table
          doc.autoTable({
              startY: startY + 20,
              head: [['S/N', 'Crimes', 'Central', 'East', 'North', 'West', 'South', 'Total']],
              body: tableData.slice(1),
              theme: 'grid',
              styles: {
                  textColor: [0, 0, 0], // Set text color to black
                  halign: 'center',
                  valign: 'middle',
              },
              headerStyles: {
                  fillColor: [0, 0, 255],
                  textColor: [255, 255, 255],
              },
              alternateRowStyles: {
                  fillColor: [230, 230, 230],
              },
          });
  
          // Update startY for the next table
          startY = doc.autoTableEndPosY() + 10;
      });
  
      // Save the PDF
      doc.save('page.pdf');
  };
  
  

  //   async function generateWord() {
  //     const doc = new Document({
  //         sections: [{
  //             properties: {},
  //             children: [
  //                 new Paragraph({
  //                     children: [
  //                         new TextRun("Hello World")
  //                     ],
  //                  }),
  //             ],
  //          }]
  //     });
  //     const buffer = await Packer.toBuffer(doc);
  //     const blob = new Blob([buffer], {type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
  //     const link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = 'my.docx';
  //     link.click();
  // }
    

    return(            
     <>
         <header className="bg-blue-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
        
             <img src={imag1} className="w-14 h-14"/>
             </a>
          </div>
          <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
          <MyDatePicker />
          <Choosedate />
          </div>
        </nav>
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
              <img src={imag1} className="w-14 h-14"/>
                </a>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <div className="-mx-3">
                    <button type="button" className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" aria-controls="disclosure-1" aria-expanded="false">
                    
                      <svg className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <div className="hidden lg:flex lg:gap-x-12">
                <MyDatePicker />
               <Choosedate />
               </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Rest of the content */}
      <div ref={contentRef}>
      <div className="mx-12">

<h1 className="text-bold text-center my-8"><b> REPORT</b></h1>
<div className='pt-8'>
  <div className="flex items-center justify-center min-h-[450px]">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h2 className="py-3"><b>Prevalent Crimes</b></h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" border='1'>
          <thead className="text-xs text-gray-700 text-bold uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 text-bold">S/N</th>
              <th scope="col" className="py-3 px-6">Crimes</th>
              <th scope="col" className="py-3 px-6">Central</th>
              <th scope="col" className="py-3 px-6">East</th>
              <th scope="col" className="py-3 px-6">North</th>
              <th scope="col" className="py-3 px-6">West</th>
              <th scope="col" className="py-3 px-6">South</th>
              <th scope="col" className="py-3 px-6 bg-gray-500">Total</th>

            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">Alex Johnson</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">Maria Garcia</td>
              <td className="py-4 px-6">55387621</td>
              <td className="py-4 px-6">$3,150.00</td>
              <td className="py-4 px-6">No</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">James Smith</td>
              <td className="py-4 px-6">90817264</td>
              <td className="py-4 px-6">$7,820.00</td>
              <td className="py-4 px-6">Yes</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">Patricia Brown</td>
              <td className="py-4 px-6">26483910</td>
              <td className="py-4 px-6">$1,230.00</td>
              <td className="py-4 px-6">Yes</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="py-4 px-6">Ethan Davis</td>
              <td className="py-4 px-6">64738290</td>
              <td className="py-4 px-6">$865.00</td>
              <td className="py-4 px-6">No</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>


<div className='pt-8'>
  <div className="flex items-center justify-center min-h-[450px]">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h2 className="py-3"><b>Prevalent Incidents</b></h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" border='1'>
          <thead className="text-xs text-gray-700 text-bold uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 text-bold">S/N</th>
              <th scope="col" className="py-3 px-6">Crimes</th>
              <th scope="col" className="py-3 px-6">Central</th>
              <th scope="col" className="py-3 px-6">East</th>
              <th scope="col" className="py-3 px-6">North</th>
              <th scope="col" className="py-3 px-6">West</th>
              <th scope="col" className="py-3 px-6">South</th>
              <th scope="col" className="py-3 px-6 bg-gray-500">Total</th>

            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">Alex Johnson</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">Maria Garcia</td>
              <td className="py-4 px-6">55387621</td>
              <td className="py-4 px-6">$3,150.00</td>
              <td className="py-4 px-6">No</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">James Smith</td>
              <td className="py-4 px-6">90817264</td>
              <td className="py-4 px-6">$7,820.00</td>
              <td className="py-4 px-6">Yes</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">Patricia Brown</td>
              <td className="py-4 px-6">26483910</td>
              <td className="py-4 px-6">$1,230.00</td>
              <td className="py-4 px-6">Yes</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="py-4 px-6">Ethan Davis</td>
              <td className="py-4 px-6">64738290</td>
              <td className="py-4 px-6">$865.00</td>
              <td className="py-4 px-6">No</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>

<div className='pt-8'>
  <div className="flex items-center justify-center min-h-[450px]">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h2 className="py-3"><b>	Number of deaths/injuries caused by traffic accidents </b></h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" border='1'>
          <thead className="text-xs text-gray-700 text-bold uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 text-bold">S/N</th>
              <th scope="col" className="py-3 px-6">Crimes</th>
              <th scope="col" className="py-3 px-6">Central</th>
              <th scope="col" className="py-3 px-6">East</th>
              <th scope="col" className="py-3 px-6">North</th>
              <th scope="col" className="py-3 px-6">West</th>
              <th scope="col" className="py-3 px-6">South</th>
              <th scope="col" className="py-3 px-6 bg-gray-500">Total</th>

            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">Alex Johnson</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">Maria Garcia</td>
              <td className="py-4 px-6">55387621</td>
              <td className="py-4 px-6">$3,150.00</td>
              <td className="py-4 px-6">No</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">James Smith</td>
              <td className="py-4 px-6">90817264</td>
              <td className="py-4 px-6">$7,820.00</td>
              <td className="py-4 px-6">Yes</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">Patricia Brown</td>
              <td className="py-4 px-6">26483910</td>
              <td className="py-4 px-6">$1,230.00</td>
              <td className="py-4 px-6">Yes</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="py-4 px-6">Ethan Davis</td>
              <td className="py-4 px-6">64738290</td>
              <td className="py-4 px-6">$865.00</td>
              <td className="py-4 px-6">No</td>
              <td className="py-4 px-6">82926417</td>
              <td className="py-4 px-6">$4,500.00</td>
              <td className="py-4 px-6">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>


</div>
          {/* Content to be included in PDF/Word */}
      </div>
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="mx-8">
        <option value="">Select Option</option>
        <option value="pdf">PDF</option>
        <option value="word">Word</option>
      </select>
      <button onClick={handleDownload} className="bg-blue-800 hover:bg-blue-500 text-white font-semibold my-3 mx-8 p-2 rounded-md">Download</button>
    </>
    )
}

export default PrintPage;