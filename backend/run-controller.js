import { searchFlights } from './controllers/flightController.js';
import dotenv from 'dotenv';
dotenv.config();

// Mock express req and res
const req = {
  body: {
    from: 'IDR',
    to: 'IXE',
    depart: '2026-07-15'
  }
};

const res = {
  status: function(code) {
    console.log('Response Status:', code);
    return this;
  },
  json: function(data) {
    console.log('Response JSON Success:', data.success);
    if (data.data) {
      console.log('Number of flights formatted:', data.data.length);
      console.log('First formatted flight:', JSON.stringify(data.data[0], null, 2));
    } else {
      console.log('Response data empty:', data);
    }
  }
};

async function testController() {
  console.log('Running searchFlights controller...');
  await searchFlights(req, res);
}

testController();
