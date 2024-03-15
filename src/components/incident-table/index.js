import React from "react";

function IncidentTable() {
  return (
    <div className="pt-12">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <h2 className="py-3">
            <b>2. Prevalent Incidents</b>
          </h2>
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
                  <td className="px-4 py-3 text-xs font-semibold border">
                    Road accidents
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs border"></td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border">2</td>
                  <td className="px-4 py-3 text-xs font-semibold border">
                    Road accidents{" "}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs border"></td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border">3</td>
                  <td className="px-4 py-3 text-xs font-semibold border">
                    Sudden death & Fatal accidents{" "}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs border"></td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border">4</td>
                  <td className="px-4 py-3 text-xs font-semibold border">
                    Fire incidents{" "}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs border"></td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border">5</td>
                  <td className="px-4 py-3 text-xs font-semibold border">
                    Dead body recovered{" "}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs border"></td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border">6</td>
                  <td className="px-4 py-3 text-xs font-semibold border">
                    Drowning{" "}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs border"></td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border">7</td>
                  <td className="px-4 py-3 text-xs font-semibold border">
                    Suspected suicide
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs border"></td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border">8</td>
                  <td className="px-4 py-3 text-xs font-semibold border">
                    UXO{" "}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs border"></td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border">9</td>
                  <td className="px-4 py-3 text-xs font-semibold border">
                    Mine collapse{" "}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"></td>
                  <td className="px-4 py-3 text-xs font-semibold border"> </td>
                  <td className="px-4 py-3 text-xs border"></td>
                  <td className="px-4 py-3 text-xs border"></td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border">10</td>
                  <td className="px-4 py-3 text-xs font-semibold border">
                    Lightning strike{" "}
                  </td>
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

      <div className="pt-8">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <h2 className="py-3">
              <b> 3. Number of deaths/injuries caused by traffic accidents </b>
            </h2>
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
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Deaths
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Serious injuries{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Minor injuries
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <h2 className="py-3">
              <b> 4. Target operations Categories of arrested suspects </b>
            </h2>
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
                    <td className="px-4 py-3 text-xs font-semibold border">
                      1
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      No. of Target operations
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td
                      className="px-4 py-3 text-sm font-extrabold border"
                      colSpan="8"
                    >
                      <center>Serious injuries</center>{" "}
                    </td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      01{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Suspected to be thieves
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      02{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Wanted by RIB
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      03{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Loiterers
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      04{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Street hawkers{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      05{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Drug consumer{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      06{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Vagabonds{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      <b>Total</b>{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <h2 className="py-3">
              <b> 5.Quantity of seized drugs </b>
            </h2>
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
                    <td
                      className="px-4 py-3 text-xs font-semibold border"
                      rowSpan="2"
                    >
                      Cannabis
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Kg{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Pellets{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Cocaine{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Grams{" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Kanyanga{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Liters{" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Illicit brew{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      liters{" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      {" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <h2 className="py-3">
              <b> 6. Quantity of seized smuggled goods </b>
            </h2>
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
                    <td
                      className="px-4 py-3 text-xs font-semibold border"
                      rowSpan="2"
                    >
                      Drinks{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Soft (Pcs){" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs border">Hard (pcs) </td>
                    <td className="px-4 py-3 text-xs border"> </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"> </td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs  border" rowSpan="3">
                      Clothes{" "}
                    </td>
                    <td className="px-4 py-3 text-xs  border">Bales </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs  border"></td>
                    <td className="px-4 py-3 text-xs  border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs  border">Kg </td>
                    <td className="px-4 py-3 text-xs  border"> </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs  border"></td>
                    <td className="px-4 py-3 text-xs  border"> </td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs border">Pcs </td>
                    <td className="px-4 py-3 text-xs border"> </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <h2 className="py-3">
              <b> 7. Vandalism </b>
            </h2>
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
                    <td className="px-4 py-3 text-xs font-semibold border">
                      Nyaruguru{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs border">Nyagatare </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"> </td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs  border">Nyamagabe </td>
                    <td className="px-4 py-3 text-xs  border"> </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs  border"></td>
                    <td className="px-4 py-3 text-xs  border"> </td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs  border">Nyamasheke </td>
                    <td className="px-4 py-3 text-xs  border"> </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs  border"></td>
                    <td className="px-4 py-3 text-xs  border"> </td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs border">Burera </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"> </td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs border">
                      <b>Total</b>{" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"> </td>
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

      <div className="pt-8">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <h2 className="py-3">
              <b> 8. Damages caused by natural disaster. </b>
            </h2>
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
                    <td className="px-4 py-3 text-xs font-semibold border">
                      East{" "}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs border">Central </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs  border">North </td>
                    <td className="px-4 py-3 text-xs  border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs  border"></td>
                    <td className="px-4 py-3 text-xs  border"> </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs  border">South </td>
                    <td className="px-4 py-3 text-xs  border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs  border"></td>
                    <td className="px-4 py-3 text-xs  border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs border">West </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs border"> </td>
                    <td className="px-4 py-3 text-xs border"></td>
                    <td className="px-4 py-3 text-xs font-semibold border"></td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-xs border">
                      <b>Total</b>{" "}
                    </td>
                    <td className="px-4 py-3 text-xs border"> </td>
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
  );
}

export default IncidentTable;
