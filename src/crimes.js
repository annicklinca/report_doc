import React, { useRef, useState } from "react"
import './reportPage.css'
import 'jspdf-autotable';
import { saveAs } from 'file-saver'; // Library to save files
import { jsPDF } from 'jspdf';
import Docxtemplater from 'docxtemplater';

const Crimes = () => {
    const contentRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleDownload = () => {
      if (selectedOption === 'pdf') {
        generatePDF();
      } 
       else {
        alert('Please select an option.');
      }
    };

    const generatePDF = () => {
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 255); // Set text color to blue
      doc.text("MONTHLY REPORT FOR JANUARY 2024", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
      
      // Table
      const tableData = [];
      const tableRows = contentRef.current.querySelectorAll('table tr');
      tableRows.forEach((row) => {
          const rowData = [];
          row.querySelectorAll('th, td').forEach((cell) => {
              rowData.push(cell.textContent.trim());
          });
          tableData.push(rowData);
      });
      const startY = 40; // Adjust the startY position as needed
      if (tableData.length > 0) {
          doc.autoTable({
              startY,
              head: [['S/N', 'Crimes', 'Central', 'East', 'North', 'West', 'South', 'Total']],
              body: tableData.slice(1), // Skip the header row
              theme: 'grid', // Apply grid theme to the table
              styles: {
                  textColor: [0, 0, 255], // Set text color to blue
                  halign: 'center', // Center align table headers
                  valign: 'middle', // Middle align table content
              },
              headerStyles: {
                  fillColor: [0, 0, 255], // Set header background color to blue
                  textColor: [255, 255, 255], // Set text color of header to white
              },
              alternateRowStyles: {
                  fillColor: [230, 230, 230], // Set alternate row background color
              },
          });
      }
      
      // Save the PDF
      doc.save('page.pdf');
  };
  
    
    //   const generateWord = () => {
    //     const content = contentRef.current.innerHTML;
    //     const doc = new Docxtemplater();
    //     doc.loadZip('./template.docx'); // Replace './template.docx' with the path to your Word template file
    
    //     doc.setData({
    //       content: content 
    //     });
    
    //     try {
    //       doc.render();
    //       const output = doc.getZip().generate({ type: 'blob' });
    //       saveAs(output, 'page.docx');
    //     } catch (error) {
    //       alert('Error generating Word document: ' + error.message);
    //     }
    //   };

    return(            
     <div className="main" ref={contentRef} style={{ marginBottom: '20px' }}>
        <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <h1 className="text-black font-bold text-2xl">NRP</h1>
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

            <a href="/crimes" className="text-sm font-semibold leading-6 text-gray-900">Crimes</a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Incidents</a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Accidents</a>
          </div>
        </nav>
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
              <h1 className="text-black font-bold text-2xl">NRP</h1>
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
                   
                  </div>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Crimes</a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Incidents</a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Accidents</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
          <div className="mx-12">

            <h1 className="text-bold text-center my-8"><b>MONTHLY REPORT FOR JANUARY 2024</b></h1>
            <p>	The security situation for the month of December 2023 was reported generally calm countrywide. However, a total number of 2,861 cases of crime, 422 incidents and 1006 road traffic accidents which caused 75 deaths and 537 injured people were recorded. RNP together with joint forces conducted 683 operations, and seized different exhibits including cannabis (197 kg and 24,216 pellets of cannabis), 2,437 liters of Kanyanga, 25,825liters of illicit brews, second hand clothes (312 bales, 1308 kg and 1,496 pcs); 5,218 pairs of Second hand shoes; 773,440 Pcs of plastic bags and 9217 bottles of assorted drinks.
            </p>
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


            </div>
         
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="mx-8">
        <option value="">Select Option</option>
        <option value="pdf">PDF</option>
        <option value="word">Word</option>
      </select>
      <button onClick={handleDownload} className="bg-green-500 hover:bg-blue-500 text-white txt-semibold my-3 mx-8 p-2 rounded-sm">Download</button>
      {/* <Button onClick={handleDownloadWord}>Download as Word</Button> */}
    </div>
    )
}

export default Crimes;