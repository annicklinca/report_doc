import { useEffect, useState } from "react";
import axios from "axios";

function CrimesPerDistrictTable() {
  const [tableData, setTableData] = useState({});
  const [sectors, setSectors] = useState([]);
  const [district, setDistrict] = useState("");

  const returnProvinceData = async (url) => {
    try {
      const response = await axios.request(url);
      return response.data.features;
    } catch (error) {
      return [];
    }
  };

  //
  const getData = async () => {
    if (district.length === 0) return;
    const urlData = `https://gis.police.gov.rw/server/rest/services/Country_Crimes_Data/FeatureServer/0/query?where=district+%3D+%27${district}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3%2C+sector&outStatistics=%5B%7B%0D%0A++%22statisticType%22%3A+%22Count%22%2C%0D%0A++%22onStatisticField%22%3A+%22crime_type_l3%22%2C%0D%0A++%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&featureEncoding=esriDefault&datumTransformation=&f=json&token=DMIJMTS5yGqTbjiaXky-5k2Bby9bNOEO85JSUkbLMp2qO0c5MbHaTl_Z2zxiwHY3beQqQ44IWcFqd0Nq1tEbctQDlsHVrTMWrzoKpOUSBqOKhk4IFywwxe_aIt9KHO1aEUMGI4PBv4KIH_52XyhLtYlJPyv5UBQpa__eSbp4TLE.`;
    const resultTable = {};
    const sectorsList = [];
    try {
      //east data
      const allData = await returnProvinceData(urlData);
      for (let i = 0; i < allData.length; i++) {
        const data = allData[i];
        if (resultTable[data.attributes.crime_type_l3]) {
          resultTable[data.attributes.crime_type_l3][data.attributes.sector] =
            data.attributes.total;
        } else {
          resultTable[data.attributes.crime_type_l3] = {
            [data.attributes.sector]: data.attributes.total,
          };
        }

        //save sector
        const exists = sectorsList.find(
          (sector) => sector == data.attributes.sector
        );
        if (!exists) {
          sectorsList.push(data.attributes.sector);
        }
      }
      //
      console.log({ resultTable, sectorsList });
      setTableData(resultTable);
      setSectors(sectorsList);
    } catch (error) {
      console.log({ error });
    }
  };

  const returnSummation = (values) => {
    return values.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  };

  useEffect(() => {
    getData();
  }, [district]);

  const retunrGeneralTotal = () => {
    const values = sectors.map((sector) =>
      returnSummation(
        Object.keys(tableData).map(
          (crime) => Number(tableData[crime][sector]) || 0
        )
      )
    );
    return returnSummation(values);
  };

  return (
    <div className="pt-12">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between gap-4">
            <h2 className="py-3">
              <b>1. Prevalent Crimes</b>
            </h2>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value={""} selected disabled>
                Choose district
              </option>
              <option value={"Rulindo"}>Rulindo</option>
              <option value={"Gakenke"}>Gakenke</option>
              <option value={"Kicukiro"}>Kicukiro</option>
              <option value={"Gasabo"}>Gasabo</option>
            </select>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full table1">
              <thead>
                <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">S/N</th>
                  <th className="px-4 py-3">Crimes</th>
                  {sectors.map((sector, index) => (
                    <th className="px-4 py-3" key={index}>
                      <span className="[writing-mode:vertical-lr]">
                        {sector}
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {Object.keys(tableData).map((crime, index) => (
                  <tr className="text-gray-700" key={index}>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {crime}
                    </td>
                    {sectors.map((sector, position) => (
                      <td className="px-4 py-3 text-xs border" key={position}>
                        {tableData[crime][sector] || "0"}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-xs border">
                      {returnSummation(
                        sectors.map((sector) =>
                          Number(tableData[crime][sector] || 0)
                        )
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="text-sm font-bold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <td className="px-4 py-3 text-sm border" colSpan={2}>
                    Total
                  </td>
                  {sectors.map((sector, index) => (
                    <td className="px-4 py-3 border" key={index}>
                      {returnSummation(
                        Object.keys(tableData).map(
                          (crime) => Number(tableData[crime][sector]) || 0
                        )
                      )}
                    </td>
                  ))}

                  <td className="px-4 py-3 border">{retunrGeneralTotal()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrimesPerDistrictTable;
