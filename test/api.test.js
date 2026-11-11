
const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let server;
let baseUrl;

test.before(() => {
  server = app.listen(0);
  baseUrl = 'http://localhost:' + server.address().port;
});

test.after(() => {
  server.close();
});

// Health check: KEEP THIS TEST
test('GET /health says the app is ok', async () => {
  const response = await fetch(baseUrl + '/health');
  const data = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.status, 'ok');
});

// Test bus ticket booking calculation
test('POST /api/calculate gives the correct fare and seat availability', async () => {
  const response = await fetch(baseUrl + '/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fare: 500,
      seats: 2,
      availableSeats: 40
    })
  });

  const data = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.totalFare, 1000);
  assert.strictEqual(data.seats, 2);
  assert.strictEqual(data.available, true);
  assert.strictEqual(data.message, 'Seats are available');
});
