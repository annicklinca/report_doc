import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

function CrimesTable() {
  const [tableData, setTableData] = useState({});

  const returnProvinceData = async (url) => {
    try {
      const response = await axios.request(url);
      return response.data.features;
    } catch (error) {
      return [];
    }
  };

  const east = `https://gis.police.gov.rw/server/rest/services/Country_Crimes_Data/FeatureServer/0/query?where=province+%3D+%27East%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3%2C+province&outStatistics=%5B%7B%0D%0A++%22statisticType%22%3A+%22Count%22%2C%0D%0A++%22onStatisticField%22%3A+%22crime_type_l3%22%2C%0D%0A++%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&featureEncoding=esriDefault&datumTransformation=&f=json&token=DMIJMTS5yGqTbjiaXky-5k2Bby9bNOEO85JSUkbLMp2qO0c5MbHaTl_Z2zxiwHY3beQqQ44IWcFqd0Nq1tEbctQDlsHVrTMWrzoKpOUSBqOKhk4IFywwxe_aIt9KHO1aEUMGI4PBv4KIH_52XyhLtYlJPyv5UBQpa__eSbp4TLE.`;
  const north = `https://gis.police.gov.rw/server/rest/services/Country_Crimes_Data/FeatureServer/0/query?where=province+%3D+%27North%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3%2C+province&outStatistics=%5B%7B%0D%0A++%22statisticType%22%3A+%22Count%22%2C%0D%0A++%22onStatisticField%22%3A+%22crime_type_l3%22%2C%0D%0A++%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&featureEncoding=esriDefault&datumTransformation=&f=json&token=DMIJMTS5yGqTbjiaXky-5k2Bby9bNOEO85JSUkbLMp2qO0c5MbHaTl_Z2zxiwHY3beQqQ44IWcFqd0Nq1tEbctQDlsHVrTMWrzoKpOUSBqOKhk4IFywwxe_aIt9KHO1aEUMGI4PBv4KIH_52XyhLtYlJPyv5UBQpa__eSbp4TLE.`;
  const west = `https://gis.police.gov.rw/server/rest/services/Country_Crimes_Data/FeatureServer/0/query?where=province+%3D+%27West%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3%2C+province&outStatistics=%5B%7B%0D%0A++%22statisticType%22%3A+%22Count%22%2C%0D%0A++%22onStatisticField%22%3A+%22crime_type_l3%22%2C%0D%0A++%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&featureEncoding=esriDefault&datumTransformation=&f=json&token=DMIJMTS5yGqTbjiaXky-5k2Bby9bNOEO85JSUkbLMp2qO0c5MbHaTl_Z2zxiwHY3beQqQ44IWcFqd0Nq1tEbctQDlsHVrTMWrzoKpOUSBqOKhk4IFywwxe_aIt9KHO1aEUMGI4PBv4KIH_52XyhLtYlJPyv5UBQpa__eSbp4TLE.`;
  const south = `https://gis.police.gov.rw/server/rest/services/Country_Crimes_Data/FeatureServer/0/query?where=province+%3D+%27South%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3%2C+province&outStatistics=%5B%7B%0D%0A++%22statisticType%22%3A+%22Count%22%2C%0D%0A++%22onStatisticField%22%3A+%22crime_type_l3%22%2C%0D%0A++%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&featureEncoding=esriDefault&datumTransformation=&f=json&token=DMIJMTS5yGqTbjiaXky-5k2Bby9bNOEO85JSUkbLMp2qO0c5MbHaTl_Z2zxiwHY3beQqQ44IWcFqd0Nq1tEbctQDlsHVrTMWrzoKpOUSBqOKhk4IFywwxe_aIt9KHO1aEUMGI4PBv4KIH_52XyhLtYlJPyv5UBQpa__eSbp4TLE.`;
  const kigali = `https://gis.police.gov.rw/server/rest/services/Country_Crimes_Data/FeatureServer/0/query?where=province+%3D+%27Kigali%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3%2C+province&outStatistics=%5B%7B%0D%0A++%22statisticType%22%3A+%22Count%22%2C%0D%0A++%22onStatisticField%22%3A+%22crime_type_l3%22%2C%0D%0A++%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&featureEncoding=esriDefault&datumTransformation=&f=json&token=DMIJMTS5yGqTbjiaXky-5k2Bby9bNOEO85JSUkbLMp2qO0c5MbHaTl_Z2zxiwHY3beQqQ44IWcFqd0Nq1tEbctQDlsHVrTMWrzoKpOUSBqOKhk4IFywwxe_aIt9KHO1aEUMGI4PBv4KIH_52XyhLtYlJPyv5UBQpa__eSbp4TLE.`;

  //
  const getData = async () => {
    const resultTable = {};
    try {
      //east data
      const eastData = await returnProvinceData(east);
      for (let i = 0; i < eastData.length; i++) {
        const data = eastData[i];
        if (resultTable[data.attributes.crime_type_l3]) {
          resultTable[data.attributes.crime_type_l3].east =
            data.attributes.total;
        } else {
          resultTable[data.attributes.crime_type_l3] = {
            east: data.attributes.total,
          };
        }
      }
      //west data
      const westData = await returnProvinceData(west);
      for (let i = 0; i < westData.length; i++) {
        const data = westData[i];
        if (resultTable[data.attributes.crime_type_l3]) {
          resultTable[data.attributes.crime_type_l3].west =
            data.attributes.total;
        } else {
          resultTable[data.attributes.crime_type_l3] = {
            west: data.attributes.total,
          };
        }
      }
      //north data
      const northData = await returnProvinceData(north);
      for (let i = 0; i < northData.length; i++) {
        const data = northData[i];
        if (resultTable[data.attributes.crime_type_l3]) {
          resultTable[data.attributes.crime_type_l3].north =
            data.attributes.total;
        } else {
          resultTable[data.attributes.crime_type_l3] = {
            north: data.attributes.total,
          };
        }
      }
      //south data
      const southData = await returnProvinceData(south);
      for (let i = 0; i < southData.length; i++) {
        const data = southData[i];
        if (resultTable[data.attributes.crime_type_l3]) {
          resultTable[data.attributes.crime_type_l3].south =
            data.attributes.total;
        } else {
          resultTable[data.attributes.crime_type_l3] = {
            south: data.attributes.total,
          };
        }
      }
      //central data
      const kigaliData = await returnProvinceData(kigali);
      for (let i = 0; i < kigaliData.length; i++) {
        const data = kigaliData[i];
        if (resultTable[data.attributes.crime_type_l3]) {
          resultTable[data.attributes.crime_type_l3].kigali =
            data.attributes.total;
        } else {
          resultTable[data.attributes.crime_type_l3] = {
            kigali: data.attributes.total,
          };
        }
      }
      //
      setTableData(resultTable);
      console.log({ resultTable });
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

  ///////////////////////////////////////////////////////////////////////
  const data = [
    ["N/A", "Old data", "Current data"],
    ["Assualt", 1995, 2013],
    ["Theft", 3290, 3120],
    ["Smuggling", 1625, 1610],
    ["Illegal Mining", 150, 200],
    ["Adultery", 50, 120],
    ["Genocide Ideology", 25, 15],
    ["Narcotic Drugs", 1290, 1290],
    ["Rape", 155, 151],
    ["Defilement", 320, 250],
    ["Domestic Violence", 28, 31],
  ];

  const options = {
    title: "Crimes per Province",
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "Number of Crimes",
      minValue: 0,
    },
    vAxis: {
      title: "Crimes",
    },
  };

  const data1 = [
    ["x", "Kigali", "East", "West ", "North", "South"],
    ["Jan", 5, 0, 12, 0, 23],
    ["Feb", 10, 5, 20, 12, 16],
    ["March", 13, 15, 12, 9, 23],
    ["April", 17, 9, 15, 10, 10],
    ["May", 18, 10, 10, 10, 5],
    ["June", 9, 5, 16, 15, 12],
    ["July", 11, 3, 20, 8, 19],
    ["Aug", 15, 10, 5, 5, 8],
  ];

  const options1 = {
    title: "Crimes per Province",
    hAxis: {
      title: "Months",
    },
    vAxis: {
      title: "Number of Crimes",
    },
    series: {
      1: { curveType: "function" },
    },
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pt-12">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <h2 className="py-3">
            <b>1. Prevalent Crimes</b>
          </h2>
          <div className="w-full overflow-x-auto">
            <table className="w-full table1">
              <thead>
                <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">S/N</th>
                  <th className="px-4 py-3">Crimes</th>
                  <th className="px-4 py-3">Central</th>
                  <th className="px-4 py-3">East</th>
                  <th className="px-4 py-3">North</th>
                  <th className="px-4 py-3">South</th>
                  <th className="px-4 py-3">West</th>
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
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {tableData[crime]?.kigali}
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      {tableData[crime]?.east}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {tableData[crime]?.north}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {tableData[crime]?.south}
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      {tableData[crime]?.west}
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      {Number(tableData[crime].kigali || 0) +
                        Number(tableData[crime]?.east || 0) +
                        Number(tableData[crime]?.north || 0) +
                        Number(tableData[crime]?.south || 0) +
                        Number(tableData[crime]?.west || 0)}
                    </td>
                  </tr>
                ))}
                <tr className="text-sm font-bold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <td className="px-4 py-3 text-sm border" colSpan={2}>
                    Total
                  </td>
                  <td className="px-4 py-3 border">
                    {returnSummation(
                      Object.keys(tableData).map(
                        (element) => Number(tableData[element].kigali) || 0
                      )
                    )}
                  </td>
                  <td className="px-4 py-3 border">
                    {returnSummation(
                      Object.keys(tableData).map(
                        (element) => Number(tableData[element].east) || 0
                      )
                    )}
                  </td>
                  <td className="px-4 py-3 border">
                    {returnSummation(
                      Object.keys(tableData).map(
                        (element) => Number(tableData[element].north) || 0
                      )
                    )}
                  </td>
                  <td className="px-4 py-3 border">
                    {returnSummation(
                      Object.keys(tableData).map(
                        (element) => Number(tableData[element].south) || 0
                      )
                    )}
                  </td>
                  <td className="px-4 py-3 border">
                    {returnSummation(
                      Object.keys(tableData).map(
                        (element) => Number(tableData[element].west) || 0
                      )
                    )}
                  </td>
                  <td className="px-4 py-3 border">
                    {returnSummation(
                      Object.keys(tableData).map(
                        (crime) =>
                          Number(tableData[crime]?.kigali || 0) +
                          Number(tableData[crime]?.east || 0) +
                          Number(tableData[crime]?.north || 0) +
                          Number(tableData[crime]?.south || 0) +
                          Number(tableData[crime]?.west || 0)
                      )
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="pt-8">
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data1}
          options={options1}
        />
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default CrimesTable;
