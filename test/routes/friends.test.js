const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const MAIN_ROUTE = '/v1/amigos';
const mail = `${Date.now()}@gmail.com`;
const secret = 'ipca!DWM@202122';
let userA;
let userB;

beforeAll(async () => {
    const resA = await app.services.user.save({ name: 'Vitor Silva', email: mail, password: '12345'});
    const resB = await app.services.user.save({ name: 'Xavier Monteiro', email: `${Date.now()}@gmail.com`, password: '12345'  });
    userA = { ...resA[0] };
    userB = { ...resB[0] };
    userA.token = jwt.encode(userA, secret);
})

test('Test #9 - Ser amigos', () => {
    return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .send({ user_id1 : userA.id, user_id2 : userB.id })
    .then((res) => {
        expect(res.status).toBe(201);
    });
});

test('Test #10 - Ver amigos', () => {
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .send({ id: userA.id})
        .then((res) => {
            expect(res.status).toBe(200);
        });
});

test('Test #11 - Remover Amigo', () => {
    return request(app).delete(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .send({ id: userA.id, idAmigo: userB.id })
        .then((res) => {
            expect(res.status).toBe(204);
        })
})