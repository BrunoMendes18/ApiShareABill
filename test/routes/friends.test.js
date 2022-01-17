const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const MAIN_ROUTE = '/v1/amigos';
const mail = `${Date.now()}@gmail.com`;
const secret = 'ipca!DWM@202122';
let userA;
let userB;
let userC;

beforeAll(async () => {
    const resA = await app.services.user.save({ name: 'Vitor Silva', email: mail, password: '12345'});
    const resB = await app.services.user.save({ name: 'Xavier Monteiro', email: `${Date.now()}@gmail.com`, password: '12345'  });
    const resC = await app.services.user.save({ name: 'Bruno Mendes', email: `${Date.now()}@gmail.com`, password: '12345'  });

    userA = { ...resA[0] };
    userB = { ...resB[0] };
    userC = { ...resC[0] };

    userA.token = jwt.encode(userA, secret);
})

test('Test #1 - Ser amigos', () => {
    return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .send({ user_id1 : userA.id, user_id2 : userB.id })
    .then((res) => {
        expect(res.status).toBe(201);
    });
});

test('Test #2 - Ver amigos', () => {
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .send({ id: userA.id})
        .then((res) => {
            expect(res.status).toBe(200);
        });
});

test('Test #3 - Ver Amigo', () => {
    return request(app).get(`${MAIN_ROUTE}/${userB.id}`)
    .set('authorization', `bearer ${userA.token}`)
    .send({ id: userA.id})
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body[0].name).toBe('Xavier Monteiro');
            
        });
})

test('Test #4 - Remover Amigo', () => {
    return app.db('amigos').insert({ user_id1: userC.id, user_id2: userA.id }, ['user_id2'])
    .then((ami) => request(app).delete(`${MAIN_ROUTE}/${ami[0].user_id2}`)
    .set('authorization', `bearer ${userA.token}`)
        .send({ id: userA.id }))
        .then((res) => { 
            expect(res.status).toBe(204);
        })
})

test('Test #5 - Pesquisar Amigo', () => {
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .send({ id: userA.id, name: 'Xavi'})
    .then((res) => {
        console.log('------------ ', res.body, '------------------------' )
        expect(res.status).toBe(200);
        expect(res.body[0].name).toBe('Xavier Monteiro');
    })
})