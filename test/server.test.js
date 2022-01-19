const supertest = require('supertest');

const request = supertest('http://localhost:3000');

test('Resposta no porto: 3001', () => {
  return request.get('/')
    .then((res) => expect(res.status).toBe(200));
});
