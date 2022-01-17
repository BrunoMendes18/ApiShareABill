const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/despesas';
const SEC_ROUTE = '/v1/membroDespesa';

const mail = `${Date.now()}@gmail.com`;
const secret = 'ipca!DWM@202122';
let user;


beforeAll(async () => {
    const res = await app.services.user.save({ name: 'User Test Despesas #1', email: mail, password: '12345'});
    user = { ...res[0] }; 
    console.log("Lindo:",user);
    user.token = jwt.encode(user, secret);
    console.log(user.token);
});

test('Test #1 - Listar despesas', () => {
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
      .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.length).toBeGreaterThan(0);
      });
});

test('Test #2 - Inserir despesa', () => {
    return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
      .send({ nome: 'Xavier22',quanti:10,tipo:1,pago:user.id })
      .then((res) => {
          console.log('Teste resbody: ',res.body);
          expect(res.status).toBe(201);
          expect(res.body.nome).toBe('Xavier22');
          expect(res.body.quanti).toBe('10.00');
          expect(res.body.tipo).toBe('1');
          expect(res.body.pago).toBe(user.id);
    });
});

describe('Validação inserir despesa', ()=>{
    const testTemplate = (newData, errorMessage) => {
        return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({nome: 'Xavier25',quanti:10,tipo:1,grupo_id: 1,pago:user.id, ...newData})
        .then((res)=>{
            expect(res.status).toBe(400);
            expect(res.body.error).toBe(errorMessage);
        });
    };
    test('Test #2.1 - Inserir despesa sem nome', () => testTemplate({nome: null},'O NOME é um atributo obrigatório'));
    test('Test #2.2 - Inserir despesa sem quantidade', () => testTemplate({quanti: null}, 'O VALOR da DESPESA é um atributo obrigatório'));
    test('Test #2.3 - Inserir despesa sem tipo', () => testTemplate({tipo: null},'A maneira como DISTRIBUI a despesa é um atributo obrigatório'));
    test('Test #2.4 - Inserir despesa sem pessoa que pagou', () => testTemplate({pago: null},'A PESSOA que PAGOU é um atributo obrigatório'));

});

test('Test #3 - Atualizar despesa',()=>{
    return app.db('despesa')
    .insert({nome: 'Atualizar Despesa Teste',quanti:69,tipo:1,grupo_id: 1,pago:user.id},['id'])
    .then((despesa)=>request(app).put(`${MAIN_ROUTE}/${despesa[0].id}`)
    .set('authorization',`bearer ${user.token}`)
    .send({nome:'Despesa Atualizada',quanti:69,tipo:1,grupo_id: 1,pago:user.id}))
    .then((res)=>{
        expect(res.status).toBe(200);
        expect(res.body.nome).toBe('Despesa Atualizada');
    });
}); 


test('Test #4 - Ver despesa por id', () => {
   return app.db('despesa')
    .insert({nome:'Ver despesa por id',quanti:79,tipo:1,grupo_id: 1,pago:user.id},['id'])
    .then((expense)=>request(app).get(`${MAIN_ROUTE}/${expense[0].id}`)
    .set('authorization',`bearer ${user.token}`))
    .then((res)=>{
        expect(res.status).toBe(200);
        expect(res.body.nome).toBe('Ver despesa por id');
        expect(res.body.pago).toBe(user.id);
    });
});

/*test('Test #5 - Ver despesas de um grupo', () => {
    let grupoID = 1;
    return request(app).get(`${MAIN_ROUTE}/${grupoID}`,['grupo_id'])
    .set('authorization',`bearer ${user.token}`)
    .then((res)=>{ 
        console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body[0].grupo_id).toBe('1');
    });
});*/

test('Test #6 - Eleminar despesa', () => {
    return app.db('despesa')
    .insert({nome:'Remover despesa por id',quanti:79,tipo:1,grupo_id: 1,pago:user.id},['id'])
    .then((expense)=>request(app).delete(`${MAIN_ROUTE}/${expense[0].id}`)
    .set('authorization',`bearer ${user.token}`)
    .send({name:'Expense deleted'}))
    .then((res)=>{
        expect(res.status).toBe(204);
    });
});


test('Test #7 - Inserir membro á despesa', () => {
    return request(app).post(SEC_ROUTE)
    .set('authorization', `bearer ${user.token}`)
      .send({ user_id: 1,desp_id: 90,deve:10 })
      .then((res) => {
          console.log('Teste resbody: ',res.body);
          expect(res.status).toBe(201);
          expect(res.body.user_id).toBe(1);
          expect(res.body.deve).toBe('10.00');
    });
});


test('Test #8 - Ver membros da despesa', () => {

    let expenseID = 91;
    return request(app).get(`${SEC_ROUTE}/${expenseID}`)
    .set('authorization',`bearer ${user.token}`)
    .then((res)=>{
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].user_id).toBe(20);
        expect(res.body[1].user_id).toBe(30);
    });
});









