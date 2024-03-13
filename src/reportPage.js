import React, { useRef, useState, useEffect } from "react";
import './reportPage.css';
import 'jspdf-autotable';
import { saveAs } from 'file-saver'; // Library to save files
import { jsPDF } from 'jspdf';
import Docxtemplater from 'docxtemplater';
import MyDatePicker from './datepicker';
import Choosedate from "./datepicker2";
// import {Document, HeadingLevel, TextRun, Packer, Paragraph, Table, Tablecell, TableRow, VerticalAlign } from "docx";
import 'jspdf-autotable';
import imag1 from "./RNP_LOGO.png"
import PrintDoc from "./generatedoc";
import axios from "axios"

const PrintPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    
    // Fetch data from API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const token = 'Kdn5k-YHUKkQopJPNNLi-oJ4T9N2IJZo3qZL0BH3kUgWJznrtiB8nsSdYcmBue7odlxN4BR6Lx1zd3-1nWT_G1QdaFB2X4YnYR_Dd3_3C0DcLsoI2Phwm3x0b_zIUK9kp7YqrfhxxSn_6n2byJsft5pvkWC9373mE4nbrQmeX'; // Replace 'YOUR_API_TOKEN' with your actual token
        const response = await axios.get(
            'https://gis.police.gov.rw/server/rest/services/Hosted/Crimes_Time_preserved/FeatureServer/0/query',
            {
                params: {
                    where: "1=1",
                    objectIds: "",
                    f: "json"
                },
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    'Content-Type': 'application/json'
                }
            }
        );
        setData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  

  const displayValue = (value) => {
    return value !== null ? value : 0;
  };

  const groupDataByCrimeType = () => {
    const groupedData = {};
    if (Array.isArray(data)) {
      data.forEach((row) => {
        const { crime_type_l3, east, south, north, central, west } = row;
        if (!groupedData[crime_type_l3]) {
          groupedData[crime_type_l3] = {
            east: displayValue(east),
            south: displayValue(south),
            north: displayValue(north),
            central: displayValue(central),
            west: displayValue(west),
          };
        } else {
          groupedData[crime_type_l3].east += displayValue(east);
          groupedData[crime_type_l3].south += displayValue(south);
          groupedData[crime_type_l3].north += displayValue(north);
          groupedData[crime_type_l3].central += displayValue(central);
          groupedData[crime_type_l3].west += displayValue(west);
        }
      });
    } else {
      console.error('Data is not an array.');
    }
    return groupedData;
  };

  const groupedData = groupDataByCrimeType();
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
      const processedTitles = new Set(); // Set to keep track of processed titles
  
      // Add report title
      doc.setFontSize(24);
      doc.text('REPORT', 105, 20, { align: 'center' });
  
      const titlesAndTables = contentRef.current.querySelectorAll('.overflow-x-auto');
      let startY = 40; // Initial startY position
  
      titlesAndTables.forEach((titleAndTable, index) => {
          const titleElement = titleAndTable.querySelector('h2');
          if (titleElement && titleElement.tagName === 'H2') {
              const title = titleElement.textContent; // Get the title before the table
  
              if (!processedTitles.has(title)) { // Check if title is already processed
                  processedTitles.add(title); // Add title to processed set
  
                  const table = titleAndTable.querySelector('table');
                  if (table) {
                      const tableData = [];
                      const tableRows = table.querySelectorAll('tr');
                      tableRows.forEach((row) => {
                          const rowData = [];
                          row.querySelectorAll('th, td').forEach((cell) => {
                              rowData.push(cell.textContent.trim());
                          });
                          tableData.push(rowData);
                      });
  
                      const estimatedTableHeight = (tableData.length + 1) * 10; // Estimate table height
                      const availableSpace = doc.internal.pageSize.height - startY; // Calculate available space
  
                      // Check if there's enough space for the title and table
                      if (availableSpace > estimatedTableHeight) {
                          if (index !== 0) {
                              startY += 20; // Add some padding if not the first table
                          }
  
                          doc.setFontSize(16);
                          doc.setFont('helvetica', 'bold'); // Set font style to bold
                          doc.text(title, 10, startY + 10);
  
                          doc.autoTable({
                              startY: startY + 20,
                              head: [['S/N', 'Crimes', 'Central', 'East', 'North', 'West', 'South', 'Total']],
                              body: tableData.slice(1),
                              theme: 'grid',
                              styles: {
                                  halign: 'center',
                                  valign: 'middle',
                              },
                              headStyles: {
                                  fillColor: [255, 255, 255],
                                  textColor: [0, 0, 0],
                                  lineWidth: 0.1,
                                  lineColor: [0, 0, 0],
                              },
                              drawHeaderRow: (row, data) => {
                                  doc.setLineWidth(0.1);
                                  doc.setDrawColor(0);
                              },
                          });
  
                          // Update startY for the next title
                          startY = doc.autoTableEndPosY() + 20;
                      } else {
                          doc.addPage(); // Move to the next page
                          startY = 20; // Reset startY position for new page
  
                          doc.setFontSize(16);
                          doc.setFont('helvetica', 'bold'); // Set font style to bold
                          doc.text(title, 10, startY + 10);
  
                          doc.autoTable({
                              startY: startY + 20,
                              head: [['S/N', 'Crimes', 'Central', 'East', 'North', 'West', 'South', 'Total']],
                              body: tableData.slice(1),
                              theme: 'grid',
                              styles: {
                                  halign: 'center',
                                  valign: 'middle',
                              },
                              headStyles: {
                                  fillColor: [255, 255, 255],
                                  textColor: [0, 0, 0],
                                  lineWidth: 0.1,
                                  lineColor: [0, 0, 0],
                              },
                              drawHeaderRow: (row, data) => {
                                  doc.setLineWidth(0.1);
                                  doc.setDrawColor(0);
                              },
                          });
  
                          // Update startY for the next title
                          startY = doc.autoTableEndPosY() + 20;
                      }
                  }
              }
          }
      });
  
      doc.save('page.pdf');
  };
  

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
        <h2 className="py-3"><b>1. Prevalent Crimes</b></h2>
        <div className="w-full overflow-x-auto">
      <table className="w-full table1">
        <thead>
          <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">S/N</th>
            <th className="px-4 py-3">Crimes</th>
            <th className="px-4 py-3">Central</th>
            <th className="px-4 py-3">East</th>
            <th className="px-4 py-3">North</th>
            <th className="px-4 py-3">West</th>
            <th className="px-4 py-3">South</th>
            <th className="px-4 py-3">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">1</td>
            <td className="px-4 py-3 text-xs font-semibold border">Theft</td>
            <td className="px-4 py-3 text-xs font-semibold border">82 </td>
            <td className="px-4 py-3 text-xs border">50</td>
            <td className="px-4 py-3 text-xs font-semibold border">85</td>
            <td className="px-4 py-3 text-xs font-semibold border">90 </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">2</td>
            <td className="px-4 py-3 text-xs font-semibold border">Assault </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">3</td>
            <td className="px-4 py-3 text-xs font-semibold border">Drug dealing </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">4</td>
            <td className="px-4 py-3 text-xs font-semibold border">Smuggling </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">5</td>
            <td className="px-4 py-3 text-xs font-semibold border">Defilement </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">6</td>
            <td className="px-4 py-3 text-xs font-semibold border">Malicious acts</td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">7</td>
            <td className="px-4 py-3 text-xs font-semibold border">Illegal border crossing</td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">8</td>
            <td className="px-4 py-3 text-xs font-semibold border">Homicide </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">9</td>
            <td className="px-4 py-3 text-xs font-semibold border">Rape </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">10</td>
            <td className="px-4 py-3 text-xs font-semibold border">Fraud </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">11</td>
            <td className="px-4 py-3 text-xs font-semibold border">Other crimes  </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border" colSpan="2"><b>Total</b></td>
            <td className="px-4 py-3 text-xs font-extrabold border"> 185</td>
            <td className="px-4 py-3 text-xs font-extrabold border"> 176 </td>
            <td className="px-4 py-3 text-xs font-extrabold border">189</td>
            <td className="px-4 py-3 text-xs font-extrabold border"> 205</td>
            <td className="px-4 py-3 text-xs font-extrabold border">103</td>
            <td className="px-4 py-3 text-xs font-extrabold border"> 858</td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
    </div>

  </div>
</div>

<div className='pt-8'>
  <div className="flex items-center justify-center min-h-[450px]">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h2 className="py-3"><b>2. Prevalent Incidents</b></h2>
        <div className="w-full overflow-x-auto">
      <table className="w-full table2">
        <thead>
          <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">S/N</th>
            <th className="px-4 py-3">Crimes</th>
            <th className="px-4 py-3">Central</th>
            <th className="px-4 py-3">East</th>
            <th className="px-4 py-3">North</th>
            <th className="px-4 py-3">West</th>
            <th className="px-4 py-3">South</th>
            <th className="px-4 py-3">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">1</td>
            <td className="px-4 py-3 text-xs font-semibold border">Road accidents</td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">2</td>
            <td className="px-4 py-3 text-xs font-semibold border">Road accidents </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">3</td>
            <td className="px-4 py-3 text-xs font-semibold border">Sudden death & Fatal accidents </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">4</td>
            <td className="px-4 py-3 text-xs font-semibold border">Fire incidents  </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">5</td>
            <td className="px-4 py-3 text-xs font-semibold border">Dead body recovered </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">6</td>
            <td className="px-4 py-3 text-xs font-semibold border">Drowning </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">7</td>
            <td className="px-4 py-3 text-xs font-semibold border">Suspected suicide</td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">8</td>
            <td className="px-4 py-3 text-xs font-semibold border">UXO </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">9</td>
            <td className="px-4 py-3 text-xs font-semibold border">Mine collapse  </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">10</td>
            <td className="px-4 py-3 text-xs font-semibold border">Lightning strike  </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
    </div>

  </div>
</div>

<div className='pt-8'>
  <div className="flex items-center justify-center min-h-[450px]">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h2 className="py-3"><b>	3. Number of deaths/injuries caused by traffic accidents </b></h2>
        <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">Severity</th>
            <th className="px-4 py-3">Central</th>
            <th className="px-4 py-3">East</th>
            <th className="px-4 py-3">North</th>
            <th className="px-4 py-3">West</th>
            <th className="px-4 py-3">South</th>
            <th className="px-4 py-3">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">Deaths</td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">Serious injuries </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs font-semibold border">Minor injuries</td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
    </div>

  </div>
</div>

<div className='pt-8'>
  <div className="flex items-center justify-center min-h-[450px]">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h2 className="py-3"><b>	4.	Target operations Categories of arrested suspects </b></h2>
        <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">S/N</th>
            <th className="px-4 py-3">Item</th>
            <th className="px-4 py-3">Central</th>
            <th className="px-4 py-3">East</th>
            <th className="px-4 py-3">North</th>
            <th className="px-4 py-3">West</th>
            <th className="px-4 py-3">South</th>
            <th className="px-4 py-3">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">1</td>
          <td className="px-4 py-3 text-xs font-semibold border">No. of Target operations</td>
            <td className="px-4 py-3 text-xs font-semibold border" ></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-sm font-extrabold border" colSpan="8"><center>Serious injuries</center> </td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">01 </td>
            <td className="px-4 py-3 text-xs font-semibold border">Suspected to be thieves</td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">02 </td>
            <td className="px-4 py-3 text-xs font-semibold border">Wanted by RIB</td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">03 </td>
            <td className="px-4 py-3 text-xs font-semibold border">Loiterers</td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">04 </td>
            <td className="px-4 py-3 text-xs font-semibold border">Street hawkers  </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">05 </td>
            <td className="px-4 py-3 text-xs font-semibold border">Drug consumer  </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">06 </td>
            <td className="px-4 py-3 text-xs font-semibold border">Vagabonds </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs font-semibold border"><b>Total</b> </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
    </div>

  </div>
</div>

<div className='pt-8'>
  <div className="flex items-center justify-center min-h-[450px]">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h2 className="py-3"><b>	5.Quantity of seized drugs 	 </b></h2>
        <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Unit</th>
            <th className="px-4 py-3">Central</th>
            <th className="px-4 py-3">East</th>
            <th className="px-4 py-3">North</th>
            <th className="px-4 py-3">West</th>
            <th className="px-4 py-3">South</th>
            <th className="px-4 py-3">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border" rowSpan="2">Cannabis</td>
            <td className="px-4 py-3 text-xs font-semibold border">Kg </td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border">24</td>
            <td className="px-4 py-3 text-xs font-semibold border">13</td>
            <td className="px-4 py-3 text-xs font-semibold border"> 8</td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">Pellets  </td>
            <td className="px-4 py-3 text-xs font-semibold border">365 </td>
            <td className="px-4 py-3 text-xs border">418</td>
            <td className="px-4 py-3 text-xs font-semibold border">23</td>
            <td className="px-4 py-3 text-xs font-semibold border"> 249</td>
            <td className="px-4 py-3 text-xs border">5318</td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs font-semibold border">Cocaine </td>
            <td className="px-4 py-3 text-xs font-semibold border">Grams </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs font-semibold border">Kanyanga </td>
            <td className="px-4 py-3 text-xs font-semibold border">Liters  </td>
            <td className="px-4 py-3 text-xs border">23</td>
            <td className="px-4 py-3 text-xs font-semibold border">162</td>
            <td className="px-4 py-3 text-xs font-semibold border">414 </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border">27</td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs font-semibold border">Illicit brew  </td>
            <td className="px-4 py-3 text-xs font-semibold border">liters    </td>
            <td className="px-4 py-3 text-xs border">2578</td>
            <td className="px-4 py-3 text-xs font-semibold border">1001</td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
            <td className="px-4 py-3 text-xs border">60</td>
            <td className="px-4 py-3 text-xs border">40</td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
    </div>

  </div>
</div>

<div className='pt-8'>
  <div className="flex items-center justify-center min-h-[450px]">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h2 className="py-3"><b>	6. Quantity of seized smuggled goods 	 </b></h2>
        <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Unit</th>
            <th className="px-4 py-3">East</th>
            <th className="px-4 py-3">North</th>
            <th className="px-4 py-3">West</th>
            <th className="px-4 py-3">South</th>
            <th className="px-4 py-3">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border" rowSpan="2">Drinks  </td>
            <td className="px-4 py-3 text-xs font-semibold border">Soft (Pcs) </td>
            <td className="px-4 py-3 text-xs font-semibold border"> 2651 </td>
            <td className="px-4 py-3 text-xs border">1316</td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"> </td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs border">Hard (pcs)  </td>
            <td className="px-4 py-3 text-xs border">100 </td>
            <td className="px-4 py-3 text-xs border">1256</td>
            <td className="px-4 py-3 text-xs border">41</td>
            <td className="px-4 py-3 text-xs border"> 32</td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs  border" rowSpan="3">Clothes  </td>
            <td className="px-4 py-3 text-xs  border">Bales  </td>
            <td className="px-4 py-3 text-xs border">10</td>
            <td className="px-4 py-3 text-xs  border"></td>
            <td className="px-4 py-3 text-xs  border">8 </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs  border">Kg  </td>
            <td className="px-4 py-3 text-xs  border">  </td>
            <td className="px-4 py-3 text-xs border">171</td>
            <td className="px-4 py-3 text-xs  border">30</td>
            <td className="px-4 py-3 text-xs  border">141 </td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs border">Pcs  </td>
            <td className="px-4 py-3 text-xs border">47   </td>
            <td className="px-4 py-3 text-xs border">79</td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border">8 </td>
            <td className="px-4 py-3 text-xs border"></td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
    </div>

  </div>
</div>

<div className='pt-8'>
  <div className="flex items-center justify-center min-h-[450px]">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h2 className="py-3"><b> 7. Vandalism  </b></h2>
        <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">District</th>
            <th className="px-4 py-3">Stolen cable (m)</th>
            <th className="px-4 py-3">Affected h.</th>
            <th className="px-4 py-3">Recovered</th>
            <th className="px-4 py-3">Arrested Suspects</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">Nyaruguru    </td>
            <td className="px-4 py-3 text-xs font-semibold border">30 </td>
            <td className="px-4 py-3 text-xs font-semibold border"> 1 </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs border">Nyagatare  </td>
            <td className="px-4 py-3 text-xs border">100 </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"> </td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs  border">Nyamagabe   </td>
            <td className="px-4 py-3 text-xs  border">80  </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs  border"></td>
            <td className="px-4 py-3 text-xs  border"> </td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs  border">Nyamasheke   </td>
            <td className="px-4 py-3 text-xs  border"> 17 </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs  border"></td>
            <td className="px-4 py-3 text-xs  border"> </td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs border">Burera  </td>
            <td className="px-4 py-3 text-xs border">10   </td>
            <td className="px-4 py-3 text-xs border">1</td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"> </td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs border"><b>Total</b>  </td>
            <td className="px-4 py-3 text-xs border">   </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"> </td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
    </div>

  </div>
</div>

<div className='pt-8'>
  <div className="flex items-center justify-center min-h-[450px]">
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h2 className="py-3"><b> 8.	Damages caused by natural disaster.    </b></h2>
        <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">Province</th>
            <th className="px-4 py-3"> House</th>
            <th className="px-4 py-3">Crops (Ha)</th>
            <th className="px-4 py-3">Classroom</th>
            <th className="px-4 py-3">Death</th>
            <th className="px-4 py-3">Road </th>
            <th className="px-4 py-3">Injury</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs font-semibold border">East     </td>
            <td className="px-4 py-3 text-xs font-semibold border">2 </td>
            <td className="px-4 py-3 text-xs font-semibold border">  </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
          </tr>
          <tr className="text-gray-700">
          <td className="px-4 py-3 text-xs border">Central  </td>
            <td className="px-4 py-3 text-xs border">4 </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"> </td>
            <td className="px-4 py-3 text-xs border">1</td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs  border">North    </td>
            <td className="px-4 py-3 text-xs  border">3  </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs  border"></td>
            <td className="px-4 py-3 text-xs  border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs  border">South    </td>
            <td className="px-4 py-3 text-xs  border"> 20 </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs  border">4</td>
            <td className="px-4 py-3 text-xs  border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border">3</td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs border">West   </td>
            <td className="px-4 py-3 text-xs border">22   </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"> </td>
            <td className="px-4 py-3 text-xs border">4</td>
            <td className="px-4 py-3 text-xs font-semibold border">1</td>
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 text-xs border"><b>Total</b>  </td>
            <td className="px-4 py-3 text-xs border">   </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs border"> </td>
            <td className="px-4 py-3 text-xs border"></td>
            <td className="px-4 py-3 text-xs font-semibold border"></td>
          </tr>
        </tbody>
      </table>
    </div>
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