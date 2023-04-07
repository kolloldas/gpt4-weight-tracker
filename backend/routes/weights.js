const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataFile = path.join(__dirname, '../data/weights.json');

router.get('/', (req, res) => {
  if (fs.existsSync(dataFile)) {
    const rawData = fs.readFileSync(dataFile);
    const weights = JSON.parse(rawData);
    res.json(weights);
  } else {
    res.json([]);
  }
});

router.post('/', (req, res) => {
  const { weight, unit, date } = req.body;

  const newWeight = {
    weight: unit === 'lbs' ? weight * 0.453592 : weight,
    date: new Date(date),
  };

  let weights = [];
  if (fs.existsSync(dataFile)) {
    const rawData = fs.readFileSync(dataFile);
    weights = JSON.parse(rawData);
  }

  weights.push(newWeight);
  fs.writeFileSync(dataFile, JSON.stringify(weights));

  res.sendStatus(201);
});

module.exports = router;

