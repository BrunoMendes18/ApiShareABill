const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@gmail.com`;

test('Test #1 - Listar os utilizadores', () => {
    return request(app).get('/users')
      .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.length).toBeGreaterThan(0);
      });
});

test('Test #2 - Inserir utilizadores', () => {
    return request(app).post('/users')
      .send({ name: 'Bruno Mendes', email: mail, password: '12345'})
      .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body.name).toBe('Bruno Mendes');
      });
});

test('Test #3 - Inserir utilizador sem nome', () => {
    return request(app).post('/users')
      .send({ email: mail, password: '12345'})
      .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.error).toBe('Nome é um atributo obrigatório');
      });
});

test('Test #4 - Inserir utilizador sem email', async() => {
    const result= await request(app).post('/users')
      .send({ name: 'Bruno Mendes', password: '12345'})
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('O email é um atributo obrigatório');
});

test('Test #5 - Inserir utilizador sem password', (done) => {
    request(app).post('/users')
      .send({ name: 'Bruno Mendes', email: mail })
      .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.error).toBe('A palavra-passe é um atributo obrigatório');
          done();
      });
});

test('Test #6 - Inserir utilizadores', () => {
    return request(app).post('/users')
      .send({ name: 'Bruno Mendes', email: mail, password: '12345' })
      .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.error).toBe('Email duplicado na BD');
      });
});