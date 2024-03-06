import React, { useRef, useState } from "react";
import './reportPage.css';
import 'jspdf-autotable';
import { Table, TableRow, TableCell, Paragraph, Packer, Document } from "docx";
// import * as fs from "fs";
import axios from "axios";

const PrintDoc = () => {
    const east = `https://gis.police.gov.rw/server/rest/services/Hosted/Crimes_Time_preserved/FeatureServer/0/query?where=province+%3D+%27East%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3&outStatistics=%5B%7B%0D%0A%22statisticType%22%3A+%22count%22%2C%0D%0A%22onStatisticField%22%3A+%22crime_type_l3+%22%2C%0D%0A%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnCentroid=false&returnEnvelope=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&datumTransformation=&lodType=geohash&lod=&lodSR=&f=json&token=M-8GBBfxXG0B4D5dBmA_Y68ilCQ21Fma26mdHS91WnjjA4RLBNf1EQ3kJTFVhR9hBOLk2nxAim2eD2auCZruaQ3l5VkgbZeCA65mXYU40RXMV_S9K8HnFp8AvnZFxcVxKNr48DsXjgrfVmz8ZAFpnDo6cC_Yf6j46w1N9gXSST0.`;
    const north = `https://gis.police.gov.rw/server/rest/services/Hosted/Crimes_Time_preserved/FeatureServer/0/query?where=province+%3D+%27North%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3&outStatistics=%5B%7B%0D%0A%22statisticType%22%3A+%22count%22%2C%0D%0A%22onStatisticField%22%3A+%22crime_type_l3+%22%2C%0D%0A%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnCentroid=false&returnEnvelope=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&datumTransformation=&lodType=geohash&lod=&lodSR=&f=json&token=M-8GBBfxXG0B4D5dBmA_Y68ilCQ21Fma26mdHS91WnjjA4RLBNf1EQ3kJTFVhR9hBOLk2nxAim2eD2auCZruaQ3l5VkgbZeCA65mXYU40RXMV_S9K8HnFp8AvnZFxcVxKNr48DsXjgrfVmz8ZAFpnDo6cC_Yf6j46w1N9gXSST0.`;
    const west = `https://gis.police.gov.rw/server/rest/services/Hosted/Crimes_Time_preserved/FeatureServer/0/query?where=province+%3D+%27West%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3&outStatistics=%5B%7B%0D%0A%22statisticType%22%3A+%22count%22%2C%0D%0A%22onStatisticField%22%3A+%22crime_type_l3+%22%2C%0D%0A%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnCentroid=false&returnEnvelope=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&datumTransformation=&lodType=geohash&lod=&lodSR=&f=json&token=M-8GBBfxXG0B4D5dBmA_Y68ilCQ21Fma26mdHS91WnjjA4RLBNf1EQ3kJTFVhR9hBOLk2nxAim2eD2auCZruaQ3l5VkgbZeCA65mXYU40RXMV_S9K8HnFp8AvnZFxcVxKNr48DsXjgrfVmz8ZAFpnDo6cC_Yf6j46w1N9gXSST0.`;
    const south = `https://gis.police.gov.rw/server/rest/services/Hosted/Crimes_Time_preserved/FeatureServer/0/query?where=province+%3D+%27South%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3&outStatistics=%5B%7B%0D%0A%22statisticType%22%3A+%22count%22%2C%0D%0A%22onStatisticField%22%3A+%22crime_type_l3+%22%2C%0D%0A%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnCentroid=false&returnEnvelope=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&datumTransformation=&lodType=geohash&lod=&lodSR=&f=json&token=M-8GBBfxXG0B4D5dBmA_Y68ilCQ21Fma26mdHS91WnjjA4RLBNf1EQ3kJTFVhR9hBOLk2nxAim2eD2auCZruaQ3l5VkgbZeCA65mXYU40RXMV_S9K8HnFp8AvnZFxcVxKNr48DsXjgrfVmz8ZAFpnDo6cC_Yf6j46w1N9gXSST0.`;
    const kigali = `https://gis.police.gov.rw/server/rest/services/Hosted/Crimes_Time_preserved/FeatureServer/0/query?where=province+%3D+%27Kigali%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&defaultSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=crime_type_l3&outStatistics=%5B%7B%0D%0A%22statisticType%22%3A+%22count%22%2C%0D%0A%22onStatisticField%22%3A+%22crime_type_l3+%22%2C%0D%0A%22outStatisticFieldName%22%3A+%22total%22%0D%0A%7D%5D&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnCentroid=false&returnEnvelope=false&timeReferenceUnknownClient=false&maxRecordCountFactor=&sqlFormat=none&resultType=&datumTransformation=&lodType=geohash&lod=&lodSR=&f=json&token=M-8GBBfxXG0B4D5dBmA_Y68ilCQ21Fma26mdHS91WnjjA4RLBNf1EQ3kJTFVhR9hBOLk2nxAim2eD2auCZruaQ3l5VkgbZeCA65mXYU40RXMV_S9K8HnFp8AvnZFxcVxKNr48DsXjgrfVmz8ZAFpnDo6cC_Yf6j46w1N9gXSST0.`;
    
    const returnProvinceData = async (url) => {
      try {
        const response = await axios.request(url);
        return response.data.features;
      } catch (error) {
        return [];
      }
    };
    
    //
    const resultTable = {};
    
    //Object format
    // theft: {center:20,east:10,.......}
    
    const getData = async () => {
      try {
        //east data
        const eastData = await returnProvinceData(east);
        for (let i = 0; i < eastData.length; i++) {
          const data = eastData[i];
          if (resultTable[data.attributes.crime_type_l3]) {
            resultTable[data.attributes.crime_type_l3].east = data.attributes.total;
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
            resultTable[data.attributes.crime_type_l3].west = data.attributes.total;
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
    
        console.log({ resultTable });
        //
        const rows = Object.keys(resultTable);
        const table = new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph("S/N")],
                }),
                new TableCell({
                  children: [new Paragraph("Crimes")],
                }),
                new TableCell({
                  children: [new Paragraph("Central")],
                }),
                new TableCell({
                  children: [new Paragraph("East")],
                }),
                new TableCell({
                  children: [new Paragraph("North")],
                }),
                new TableCell({
                  children: [new Paragraph("South")],
                }),
                new TableCell({
                  children: [new Paragraph("West")],
                }),
                new TableCell({
                  children: [new Paragraph("Total")],
                }),
              ],
            }),
            ...rows.map((row, index) => {
              const rowNum = index + 1;
              return new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph(String(rowNum))],
                  }),
                  new TableCell({
                    children: [new Paragraph(row)],
                  }),
                  new TableCell({
                    children: [new Paragraph(String(resultTable[row].kigali || 0))],
                  }),
                  new TableCell({
                    children: [new Paragraph(String(resultTable[row].east || 0))],
                  }),
                  new TableCell({
                    children: [new Paragraph(String(resultTable[row].north || 0))],
                  }),
                  new TableCell({
                    children: [new Paragraph(String(resultTable[row].south || 0))],
                  }),
                  new TableCell({
                    children: [new Paragraph(String(resultTable[row].west || 0))],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        String(returnSummationOfTheRow(row, resultTable))
                      ),
                    ],
                  }),
                ],
              });
            }),
          ],
        });
    
        //create document
        const doc = new Document({
          sections: [
            {
              children: [table],
            },
          ],
        });
    
        //save the file
        Packer.toBuffer(doc).then((buffer) => {
          fs.writeFileSync("my doc.docx", buffer);
        });
      } catch (error) {
        console.log({ error });
      }
    };
    
    const returnSummationOfTheRow = (rowName, tableData) => {
      let sum = 0;
      //central
      sum += tableData[rowName].kigali || 0;
      sum += tableData[rowName].east || 0;
      sum += tableData[rowName].north || 0;
      sum += tableData[rowName].west || 0;
      sum += tableData[rowName].south || 0;
      return sum;
    };
    
    getData();
}

export default PrintDoc;