// import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "jspdf-autotable";
import imag1 from "../../RNP_LOGO.png";

function AppHeader() {
  return (
    <header className="flex bg-gray-300 sticky ">
      <nav
        className="w-screen bg-gray-400 sticky top-0 text-gray-200 flex justify-between items-center px-2 md:px-24 font-semibold text-sm py-2"
        aria-label="Global"
      >
        <div className="flex">
          <img src={imag1} alt="/" className="w-12 h-12" />
        </div>
        <div className="flex lg:gap-x-12"></div>
      </nav>
    </header>
  );
}

export default AppHeader;
