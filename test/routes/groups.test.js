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

test('Test #1 - Criar Grupo', () => {
    return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
      .send({ nome: 'Grupo1', desc: 'descricao', data: new Date(), admin: userA.id})
      .then((res) => {
          expect(res.status).toBe(201);
    });
});

describe('Test #2 - Criação inválida ...', () => {
    const testTemplate = (newData, errorMessage) => {
        return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${userA.token}`)
        .send({ nome: 'Grupo 2', desc: 'descricao' , data: new Date(), admin: userA.id, ...newData })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe(errorMessage);
        });
    };

    test('Test #2.1 - Inserir sem nome', () => testTemplate({ nome:null }, 'O NOME é um atributo obrigatório!'));
    test('Test #2.2 - Inserir sem data', () => testTemplate({ data: null }, 'A DATA é um atributo obrigatório!'));
    test('Test #2.3 - Inserir sem admin', () => testTemplate({ admin: null }, 'ADMIN é um atributo obrigatório!'));
});

test('Test #3 - Ver Grupos',()=>{
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .then((res)=>{
        expect(res.status).toBe(200);       
        expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #4 - Ver grupo selecionado', () => {
    return request(app).get(`${MAIN_ROUTE}/${grupoA.id}`)
    .set('authorization', `bearer ${userA.token}`)
    .then((res) => {          
        expect(res.status).toBe(200);
        expect(res.body.nome).toBe('Grupo1');
    })
})

test('Test #5 - Adicionar Membro Ao grupo', () => {
    return request(app).post(SEC_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
      .send({ user_id:userA.id, grupo_id: grupoA.id})
      .then((res) => {
          expect(res.status).toBe(201);
    });
});


test('Test #6 - Remover Membro Ao grupo', () => {
    return app.db('membrosGrupo').insert(
        { user_id:userA.id, grupo_id:grupoA.id }, ['user_id'],
    ).then((mem) => request(app).delete(SEC_ROUTE)
        .set('authorization', `bearer ${userA.token}`)
        .send({grupo_id: grupoA.id, user_id: mem[0].user_id})
        .then((res) => {
            expect(res.status).toBe(204);
        }));
});

test('Test #7 - Filtrar por todos os grupos',()=>{
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .then((res)=>{
        expect(res.status).toBe(200);       
        expect(res.body.length).toBeGreaterThan(0);
    });
});


test('Test #8 - Pesquisar grupo', () => {
    return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .send({id: userA.id, nome: 'Grupo'})
    .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body[0].nome).toBe('Grupo2')
    })
})


test('Test #9 - Atualizar grupo', () => {
    return request(app).put(`${MAIN_ROUTE}/10001`)
    .set('authorization', `bearer ${userA.token}`)
    .send({nome: 'Grupo 2 Atualizado', desc: 'Férias na praia'})
    .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.nome).toBe('Grupo 2 Atualizado')
        expect(res.body.desc).toBe('Férias na praia')
    })
})

test('Test #10 - Eliminar Grupo', () => {
    return request(app).delete(`${MAIN_ROUTE}/${grupoA.id}`)
    .set('authorization', `bearer ${userA.token}`)
    .send({idUser: 10001})
    .then((res) => {
        expect(res.status).toBe(204);
    })
})
