import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Choosedate = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2 className='font-semibold text-white p-2'>Choose second Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className='p-1 rounded-full border-blue-900'
        dateFormat="MM/dd/yyyy"
        isClearable
        placeholderText="Select a date"
      />
    </div>
  );
};

export default Choosedate;
