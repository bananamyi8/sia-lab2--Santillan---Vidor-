
const express = require('express');
const path = require('path');

const {
  calculateTotalFare,
  checkSeatAvailability
} = require('./logic');

const { version } = require('../package.json');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

// Health check: DO NOT CHANGE
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: version });
});

// Calculate total bus ticket fare
app.post('/api/calculate', (req, res) => {
  try {
    const fare = Number(req.body.fare);
    const seats = Number(req.body.seats);
    const availableSeats = Number(req.body.availableSeats);

    const totalFare = calculateTotalFare(fare, seats);

    const isAvailable = checkSeatAvailability(
      availableSeats,
      seats
    );

    res.json({
      totalFare: totalFare,
      seats: seats,
      available: isAvailable,
      message: isAvailable
        ? 'Seats are available'
        : 'Not enough available seats'
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
