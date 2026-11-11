
const test = require('node:test');
const assert = require('node:assert');

const {
  calculateTotalFare,
  checkSeatAvailability
} = require('../src/logic');

// Test 1: Calculate total fare for 2 seats
test('500 pesos per ticket for 2 seats equals 1000 pesos', () => {
  assert.strictEqual(calculateTotalFare(500, 2), 1000);
});

// Test 2: Calculate total fare for 3 seats
test('300 pesos per ticket for 3 seats equals 900 pesos', () => {
  assert.strictEqual(calculateTotalFare(300, 3), 900);
});

// Test 3: Check if requested seats are available
test('40 available seats can accommodate 5 passengers', () => {
  assert.strictEqual(checkSeatAvailability(40, 5), true);
});

// Test 4: Check if there are insufficient seats
test('2 available seats cannot accommodate 5 passengers', () => {
  assert.strictEqual(checkSeatAvailability(2, 5), false);
});

// Test 5: Reject invalid ticket fare
test('zero ticket fare is not allowed', () => {
  assert.throws(() => calculateTotalFare(0, 2));
});
