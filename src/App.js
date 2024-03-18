import { useRef } from "react";
import "./App.css";
import AppHeader from "./components/app-header";
import CrimesTable from "./components/crimes-table";
import IncidentsPerDistrictTable from "./components/incident-per-district";
import IncidentTable from "./components/incident-table";
import RoadTable from "./components/road-table";
import axios from "axios";
import CrimesPerDistrictTable from "./components/crime-per-district";
import RoadsPerDistrictTable from "./components/road-per-district";

const AppContents = () => {
  return (
    <div>
      <h1 className="text-bold text-center my-8">
        <b>REPORT</b>
      </h1>
      <CrimesPerDistrictTable />
      <IncidentsPerDistrictTable />
      <RoadsPerDistrictTable />
      <CrimesTable />
      <IncidentTable />
      <RoadTable />
    </div>
  );
};

function App() {
  const contentsRef = useRef();

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
      <div className="app-header">
        <AppHeader />
      </div>
      <div className="app-container">
        <div className="flex items-center justify-end gap-4 document-export">
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded-md"
            onClick={() => handleDownload()}
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
        <div ref={contentsRef}>
          <AppContents />
        </div>
      </div>
    </>
  );
}

export default App;
