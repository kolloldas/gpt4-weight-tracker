import React, { useState, useEffect } from 'react';
import WeightForm from './components/WeightForm';
import WeightGraph from './components/WeightGraph';

function App() {
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const fetchWeights = async () => {
      const response = await fetch('/api/weights');
      const data = await response.json();
      setWeights(data);
    };

    fetchWeights();
  }, []);

  const handleWeightSave = (newWeight) => {
    setWeights([...weights, newWeight]);
  };

  return (
    <div className="container">
      <h1>Weight Tracker</h1>
      <WeightForm onSave={handleWeightSave} />
      <WeightGraph weights={weights} />
    </div>
  );
}

export default App;
