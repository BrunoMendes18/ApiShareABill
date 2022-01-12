const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/users';

const mail = `${Date.now()}@gmail.com`;
const secret = 'ipca!DWM@202122';
let user;

beforeAll(async () => {
    const res = await app.services.user.save({ name: 'Bruno Mendes', email: mail, password: '12345'});
    user = { ...res[0] };
    user.token = jwt.encode(user, secret);
    console.log(user.token);
});

test('Test #1 - Listar os utilizadores', () => {
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
      .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.length).toBeGreaterThan(0);
      });
});

test('Test #2 - Inserir utilizadores', () => {
    return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
      .send({ name: 'Bruno Mendes', email: `${Date.now()}@gmail.com`, password: '12345'})
      .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body.name).toBe('Bruno Mendes');
          expect(res.body).not.toHaveProperty('password');
    });
});

test('Test #2.1 - Guardar a palavra-passe encriptada',async()=>{
    const res = await request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
        .send({name:'Bruno Mendes',email:`${Date.now()}@gmail.com`,password:"12345"});
    expect(res.status).toBe(201);

    const {id}=res.body;
    const userDB=await app.services.user.findOne({id});
    expect(userDB.password).not.toBeUndefined();
    expect(userDB.password).not.toBe('12345');
});

describe('Test #3 - Registo inválido ...', () => {
    const testTemplate = (newData, errorMessage) => {
        return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ name: 'Vitor Silva', email: `${Date.now()}@gmail.com`, password:'12345', ...newData })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe(errorMessage);
        });
    };

    test('Test #3.1 - Inserir sem nome', () => testTemplate({ name:null }, 'O NOME é um atributo obrigatório!'));
    test('Test #3.2 - Inserir utilizador sem email', () => testTemplate({ email: null }, 'O EMAIL é um atributo obrigatório!'));
    test('Test #3.3 - Inserir email duplo', () => testTemplate({ email: mail }, 'EMAIL já registado!'));  
    test('Test #3.4 - Inserir sem password', () => testTemplate({ password: null }, 'A PASSWORD é um atributo obrigatório!'));
});