const bcrypt = require('bcrypt-nodejs');
const validationError = require('../errors/validationError');

module.exports = (app) => {
    const findAll = (filter) => {
      return app.db('users').where(filter).select(['id', 'email', 'name']);
    };

    const findOne = (filter) => {
      return app.db('users').where(filter).first();
    };

    const getPasswdHash=(passwd)=>{
      const salt=bcrypt.genSaltSync(10);
      return bcrypt.hashSync(passwd,salt);
    };

    const validate = async (user) => {
      if (!user.name) throw new validationError ('O NOME é um atributo obrigatório!');
      if (!user.email) throw new validationError ('O EMAIL é um atributo obrigatório!');
      if (!user.password) throw new validationError ('A PASSWORD é um atributo obrigatório!');

      const userDb = await findOne({ email: user.email });
      if (userDb) throw new validationError ('EMAIL já registado!');
    }

    const save = async (user) => {

      const newUser={ ...user };
      newUser.password=getPasswdHash(user.password);
      return await app.db('users').insert(newUser,['id','email','name']);

    };

    return { findAll, validate, save, findOne };
};