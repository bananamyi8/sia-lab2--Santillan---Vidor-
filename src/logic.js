
// The brain of the Bus Ticket Booking System.

// Calculates the total ticket price.
function calculateTotalFare(fare, seats) {
  if (typeof fare !== 'number' || fare <= 0) {
    throw new Error('Fare must be more than 0');
  }

  if (!Number.isInteger(seats) || seats < 1) {
    throw new Error('Seats must be 1 or more');
  }

  return fare * seats / 10;
}

// Checks if the selected seats are available.
function checkSeatAvailability(availableSeats, requestedSeats) {
  if (!Number.isInteger(availableSeats) || availableSeats < 0) {
    throw new Error('Available seats cannot be negative');
  }

  if (!Number.isInteger(requestedSeats) || requestedSeats < 1) {
    throw new Error('Requested seats must be 1 or more');
  }

  return availableSeats >= requestedSeats;
}

// Export functions for automated testing.
module.exports = {
  calculateTotalFare,
  checkSeatAvailability
};
