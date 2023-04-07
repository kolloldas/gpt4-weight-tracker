import React, { useState, useEffect } from 'react';

function DatePicker({ onDateChange = () => {} }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    onDateChange(new Date(date));
  }, [date, onDateChange]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <input
      type="date"
      value={date}
      onChange={handleDateChange}
    />
  );
}

export default DatePicker;
