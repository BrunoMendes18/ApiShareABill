const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const MAIN_ROUTE = '/v1/grupo';

const mail = `${Date.now()}@gmail.com`;
const secret = 'ipca!DWM@202122';
let user;

beforeAll(async () => {
    const res = await app.services.user.save({ name: 'Bruno Mendes', email: mail, password: '12345'});
    user = { ...res[0] };
    user.token = jwt.encode(user, secret);
    console.log(user.token);
});

test('Test #11 - Criar Grupo', () => {
    return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
      .send({ nome: 'Grupo1', desc: 'descricao' , data: new Date(), admin: user.id})
      .then((res) => {
          expect(res.status).toBe(201);
    });
});
//falta validacao sem nome

test('Test #12 - Ver Grupos',()=>{
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res)=>{
        expect(res.status).toBe(200);       
        expect(res.body.length).toBeGreaterThan(0);
    });
});


