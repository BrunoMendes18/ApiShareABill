const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const MAIN_ROUTE = '/v1/grupo';
const SEC_ROUTE = '/v1/membroGrupo';

const secret = 'ipca!DWM@202122';
const userA ={id: 10000, name: 'User IPCA #1', email: 'user1@ipca.pt', password: '56789'};
const grupoA ={id: 10000, nome: 'Grupo1', desc: 'descricao' , data: new Date(), admin: 10000};
userA.token = jwt.encode(userA, secret);

beforeAll(() => {
    return app.db.seed.run();
})

test('Test #10 - Criar Grupo', () => {
    return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
      .send({ nome: 'Grupo1', desc: 'descricao', data: new Date(), admin: userA.id})
      .then((res) => {
          expect(res.status).toBe(201);
    });
});

describe('Test #11 - Criação inválida ...', () => {
    const testTemplate = (newData, errorMessage) => {
        return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${userA.token}`)
        .send({ nome: 'Grupo 2', desc: 'descricao' , data: new Date(), admin: userA.id, ...newData })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe(errorMessage);
        });
    };

    test('Test #11.1 - Inserir sem nome', () => testTemplate({ nome:null }, 'O NOME é um atributo obrigatório!'));
    test('Test #11.2 - Inserir sem data', () => testTemplate({ data: null }, 'A DATA é um atributo obrigatório!'));
    test('Test #11.3 - Inserir sem admin', () => testTemplate({ admin: null }, 'ADMIN é um atributo obrigatório!'));
});

test('Test #12 - Ver Grupos',()=>{
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .then((res)=>{
        expect(res.status).toBe(200);       
        expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #13 - Adicionar Membro Ao grupo', () => {
    return request(app).post(SEC_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
      .send({ user_id:userA.id, grupo_id:grupoA.id})
      .then((res) => {
          expect(res.status).toBe(201);
    });
});


test('Test #14 - Remover Membro Ao grupo', () => {
    return app.db('membrosGrupo').insert(
        { user_id:userA.id, grupo_id:grupoA.id }, ['user_id'],
    ).then((mem) => request(app).delete(`${SEC_ROUTE}/${mem[0].user_id}`)
        .set('authorization', `bearer ${userA.token}`)
        .then((res) => {
            expect(res.status).toBe(204);;
        }));
});

test('Test #15 - Filtrar por todos os grupos',()=>{
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .then((res)=>{
        expect(res.status).toBe(200);       
        expect(res.body.length).toBeGreaterThan(0);
    });
});



