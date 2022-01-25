const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/despesas';
const SEC_ROUTE = '/v1/membroDespesa';

const secret = 'ipca!DWM@202122';
const userA = {
  id: 10000, name: 'User IPCA #1', email: 'user1@ipca.pt', password: '56789',
};
const despA = {
  id: 10000, nome: 'Despesa1', quanti: 50, tipo: 1, pago: 10000,
};
const grupo = {
  id: 10001, nome: 'Grupo2', desc: 'descricao', data: new Date(), admin: 10001,
};
userA.token = jwt.encode(userA, secret);

beforeAll(async () => {
  return app.db.seed.run();
});

test('Test #1 - Listar despesas', () => {
  return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #2 - Inserir despesa', () => {
  return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .send({
      nome: 'Xavier22', quanti: 10, tipo: 1, pago: userA.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.nome).toBe('Xavier22');
      expect(res.body.quanti).toBe('10.00');
      expect(res.body.tipo).toBe('1');
      expect(res.body.pago).toBe(userA.id);
    });
});

describe('Validação inserir despesa', () => {
  const testTemplate = (newData, errorMessage) => {
    return request(app).post(MAIN_ROUTE)
      .set('authorization', `bearer ${userA.token}`)
      .send({
        nome: 'Xavier25', quanti: 10, tipo: 1, grupo_id: 1, pago: userA.id, ...newData,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(errorMessage);
      });
  };
  test('Test #2.1 - Inserir despesa sem nome', () => testTemplate({ nome: null }, 'O NOME é um atributo obrigatório'));
  test('Test #2.2 - Inserir despesa sem quantidade', () => testTemplate({ quanti: null }, 'O VALOR da DESPESA é um atributo obrigatório'));
  test('Test #2.3 - Inserir despesa sem tipo', () => testTemplate({ tipo: null }, 'A maneira como DISTRIBUI a despesa é um atributo obrigatório'));
  test('Test #2.4 - Inserir despesa sem pessoa que pagou', () => testTemplate({ pago: null }, 'A PESSOA que PAGOU é um atributo obrigatório'));
});

test('Test #3 - Atualizar despesa', () => {
  return app.db('despesa')
    .insert({
      nome: 'Atualizar Despesa Teste', quanti: 69, tipo: 1, grupo_id: grupo.id, pago: userA.id,
    }, ['id'])
    .then((despesa) => request(app).put(`${MAIN_ROUTE}/${despesa[0].id}`)
      .set('authorization', `bearer ${userA.token}`)
      .send({ nome: 'Despesa Atualizada', quanti: 70 }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('Despesa Atualizada');
    });
});

test('Test #4 - Ver despesa por id', () => {
  return app.db('despesa')
    .insert({
      nome: 'Ver despesa por id', quanti: 79, tipo: 1, grupo_id: grupo.id, pago: userA.id,
    }, ['id'])
    .then((expense) => request(app).get(`${MAIN_ROUTE}/1/${expense[0].id}`)
      .set('authorization', `bearer ${userA.token}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('Ver despesa por id');
      expect(res.body.pago).toBe(userA.id);
    });
});

test('Test #5 - Ver despesas de um grupo', () => {
  return request(app).get(`${MAIN_ROUTE}/2/${grupo.id}`)
    .set('authorization', `bearer ${userA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #6 - Eleminar despesa', () => {
  return app.db('despesa')
    .insert({
      nome: 'Remover despesa por id', quanti: 79, tipo: 1, grupo_id: null, pago: userA.id,
    }, ['id'])
    .then((expense) => request(app).delete(`${MAIN_ROUTE}/${expense[0].id}`)
      .set('authorization', `bearer ${userA.token}`)
      .send({ name: 'Expense deleted' }))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

test('Test #7 - Inserir membro á despesa', () => {
  return request(app).post(SEC_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .send({ user_id: userA.id, desp_id: despA.id, deve: 10 })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.user_id).toBe(10000);
      expect(res.body.deve).toBe('10.00');
    });
});

test('Test #8 - Ver membros da despesa', () => {
  return request(app).get(`${SEC_ROUTE}/${despA.id}`)
    .set('authorization', `bearer ${userA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].user_id).toBe(10001);
    });
});
