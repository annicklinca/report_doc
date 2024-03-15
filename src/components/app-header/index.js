import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "jspdf-autotable";
import imag1 from "../../RNP_LOGO.png";

function AppHeader() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <header className="bg-gray-300">
      <nav
        className="mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <img src={imag1} alt="/" className="w-12 h-12" />
        </div>
        <div className="flex lg:gap-x-12">
          {/* <DatePicker
            selected={selectedDate}
            className="p-1 rounded-half border-blue-900"
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            isClearable
            placeholderText="Select a date"
          />
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="p-1 rounded-half border-blue-900"
            dateFormat="MM/dd/yyyy"
            isClearable
            placeholderText="Select a date"
          /> */}
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
