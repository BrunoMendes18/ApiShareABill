const request=require('supertest');
const app=require('../../src/app');
const mail=`${Date.now()}@gmail.com`;

test('Test #13 - Receber token ao autenticar',()=>{
    return app.services.user.save(
        {name: 'Bruno Auth', email: mail,password: '12345'}
    ).then(()=>request(app).post('/auth/signin')
    .send({ email: mail, password: '12345'}))
    .then((res)=>{
        expect(res.status).toBe(200);
        console.log(res.body);
        expect(res.body).toHaveProperty('token');
    });
});

test('Test #14 - Tentativa de autenticação errada', ()=>{
    const mail=`${Date.now()}@gmail.com`;
    return app.services.user.save(
        {name: 'Bruno Auth', email: mail, password: '12345'}
    ).then(() => request(app).post('/auth/signin')
        .send({ email: mail, password: '6789' }))
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Autenticação inválida!');
        });
});

test('Test #15 - Tentativa de autenticação com utilizador errado', () => {
    const mail=`${Date.now()}@gmail.com`;
    return request(app).post('/auth/signin')
        .send({ email: mail, password: '6789' })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Autenticação inválida! #2');
        });
});

test('Test #16 - Aceder a rotas protegidas', () => {
    return request(app).get('/v1/users')
        .then((res)=> {
            expect(res.status).toBe(401);
        });
});

test('Test #17 - Criar utilizador', () => {
    const mail = `${Date.now()}@gmail.com`;
    return request(app).post('/auth/signup')
        .send({ name: 'Bruno Signup', email: mail, password: '12345'})
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Bruno Signup');
            expect(res.body).toHaveProperty('email');
            expect(res.body).not.toHaveProperty('password');
        });
});