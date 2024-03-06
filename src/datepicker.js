import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2 className='font-semibold text-white p-2'>Choose first Date</h2>
      <DatePicker
        selected={selectedDate}
        className='p-1 rounded-full border-blue-900'
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        isClearable
        placeholderText="Select a date"
      />
    </div>
  );
};

export default MyDatePicker;
