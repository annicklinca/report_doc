import "./App.css";
import AppHeader from "./components/app-header";
import CrimesTable from "./components/crimes-table";
import IncidentTable from "./components/incident-table";
import RoadTable from "./components/road-table";

function App() {
  return (
    <>
      <AppHeader />
      <div className="app-container">
        <h1 className="text-bold text-center my-8">
          <b>REPORT</b>
        </h1>
        <CrimesTable />
        <IncidentTable />
        <RoadTable />
      </div>
    </>
  );
}

export default App;
