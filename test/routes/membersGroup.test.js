const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const MAIN_ROUTE = '/v1/membrosGrupo';

const secret = 'ipca!DWM@202122';
const userA ={id: 10000, name: 'User IPCA #1', email: 'user1@ipca.pt', password: '56789'};
const grupoA ={id: 10000, nome: 'Grupo1', desc: 'descricao' , data: new Date(), admin: 10000};
userA.token = jwt.encode(userA, secret);

beforeAll(() => {
    return app.db.seed.run();
})

test('Test #13 - Adicionar Membro Ao grupo', () => {
    return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
      .send({ user_id:userA.id, grupo_id:grupoA.id})
      .then((res) => {
          console.log(res.body);
          expect(res.status).toBe(201);
    });
});
