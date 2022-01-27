const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const MAIN_ROUTE = '/v1/amigos';
const mail = `${Date.now()}@gmail.com`;
const secret = 'ipca!DWM@202122';

const userA = {
  id: 10000, name: 'User IPCA #1', email: 'user1@ipca.pt', password: '56789',
};
const userB = {
  id: 10001, name: 'User IPCA #2', email: 'user2@ipca.pt', password: '56789',
};

const userC = {
  id: 10003, name: 'Vitor Silva', email: 'vitor@gmail.com', password: '12345',
};

userA.token = jwt.encode(userA, secret);

beforeAll(async () => {
  return app.db.seed.run();
});

test('Test #1 - Ser amigos', () => {
  return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .send({ user_id1: userA.id, user_id2: userC.id })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

test('Test #2 - Ver amigos', () => {
  return request(app).get(`${MAIN_ROUTE}/${userA.id}`)
    .set('authorization', `bearer ${userA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #3 - Ver Amigo', () => {
  return request(app).get(`${MAIN_ROUTE}/1/${userA.id}/${userB.id}`)
    .set('authorization', `bearer ${userA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body[0].name).toBe('User IPCA #2');
    });
});

test('Test #4 - Remover Amigo', () => {
  return app.db('amigos').insert({ user_id1: userC.id, user_id2: userA.id }, ['user_id2'])
    .then((ami) => request(app).delete(`${MAIN_ROUTE}/${userA.id}/${ami[0].user_id2}`)
      .set('authorization', `bearer ${userA.token}`)
      .then((res) => {
        expect(res.status).toBe(204);
      }));
});

test('Test #5 - Pesquisar Amigo', () => {
  return request(app).get(`${MAIN_ROUTE}/2/${userA.id}/Vitor`)
    .set('authorization', `bearer ${userA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body[0].name).toBe('Vitor Silva');
    });
});
