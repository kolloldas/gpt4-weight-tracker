import React, { useState } from 'react';
import DatePicker from './DatePicker';

function WeightForm({ onSave }) {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/weights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weight, unit, date }),
    });

    if (response.status === 201) {
      onSave({ weight: unit === 'lbs' ? weight * 0.453592 : weight, date });
      setWeight('');
      setDate(new Date());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        step="0.1"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Enter your weight"
        required
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
      <option value="kg">Kilograms (kg)</option>
        <option value="lbs">Pounds (lbs)</option>
      </select>
      <DatePicker date={date} setDate={setDate} />
      <button type="submit">Save Weight</button>
    </form>
  );
}

export default WeightForm;

