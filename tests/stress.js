// k6 run tests/stress.js

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '15s',
  thresholds: {
    http_req_failed: ['rate<0.1'],
  },
};

export default function () {
  http.get('http://localhost:3000/qa/questions?product_id=63610');
  sleep(1);
}
