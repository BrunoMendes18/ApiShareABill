const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const MAIN_ROUTE = '/v1/grupo';

const secret = 'ipca!DWM@202122';
const userA ={id: 10000, name: 'User IPCA #1', email: 'user1@ipca.pt', password: '56789'};
const grupoA ={id: 10000, nome: 'Grupo1', desc: 'descricao' , data: new Date(), admin: 10000};
userA.token = jwt.encode(userA, secret);

beforeAll(() => {
    return app.db.seed.run();
})

test('Test #11 - Criar Grupo', () => {
    return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
      .send({ nome: 'Grupo1', desc: 'descricao' , data: new Date(), admin: userA.id})
      .then((res) => {
          expect(res.status).toBe(201);
    });
});
//falta validacao sem nome

test('Test #12 - Ver Grupos',()=>{
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .then((res)=>{
        expect(res.status).toBe(200);       
        expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #14 - Filtrar por todos os grupos',()=>{
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .then((res)=>{
        expect(res.status).toBe(200);       
        expect(res.body.length).toBeGreaterThan(0);
    });
});



