import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import AppHeader from './components/app-header';
import CrimesTable from './components/crimes-table';
import IncidentsPerDistrictTable from './components/incident-per-district';
import IncidentTable from './components/incident-table';
import RoadTable from './components/road-table';
import Login from './components/login'; // Import your Login component
import { useRef } from 'react';
import axios from 'axios';

const AppContents = () => {
  return (
    <div>
      <h1 className="text-bold text-center my-8">
        <b>REPORT</b>
      </h1>
      <IncidentsPerDistrictTable />
      <CrimesTable />
      <IncidentTable />
      <RoadTable />
    </div>
  );
};

const MainLayout = ({ children }) => {
  const location = useLocation();
  const contentsRef = useRef();

  // Check if the current location is not the login page
  const isNotLoginPage = location.pathname !== '/login';

  const handleDownload = async () => {
    const htmlString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Report</title>
    </head>
    <body>
      ${contentsRef.current.innerHTML}
    </body>
    </html>`;

    axios
      .post(
        "http://localhost:3001/convertToDocx",
        { html: htmlString },
        { responseType: "blob" }
      )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        const link = document.createElement("a");

        link.href = window.URL.createObjectURL(blob);

        link.download = "my_document.docx";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error converting HTML to Word document:", error);
      });
  };

  return (
    <>
      {isNotLoginPage && (
        <div className="app-header">
          <AppHeader />
        </div>
      )}
      <div className="app-container">
        {isNotLoginPage && (
          <div className="flex items-center justify-end gap-4 document-export">
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded-md"
              onClick={handleDownload}
            >
              Download Word document
            </button>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded-md"
              onClick={() => window.print()}
            >
              Print
            </button>
          </div>
        )}
        <div ref={contentsRef}>
          {children}
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><AppContents /></MainLayout>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
