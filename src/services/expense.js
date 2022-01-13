
const validationError = require('../errors/validationError');
module.exports = (app) => {
    
    const validate =async (data) =>{
        console.log('****-------- ');
        console.log(data);
        if (!data.nome) throw new validationError('O NOME é um atributo obrigatório');
        if (!data.quanti) throw new validationError('O VALOR da DESPESA é um atributo obrigatório');
        if (!data.tipo) throw new validationError('A maneira como DISTRIBUI a despesa é um atributo obrigatório');
        if (!data.pago) throw new validationError('A PESSOA que PAGOU é um atributo obrigatório');
    }
    const findAll = () => {
        return app.db('despesa').select('*');
    }

    const save = async (expense) => {
        console.log('----------------------------');
        console.log(expense);
        return await app.db('despesa').insert(expense,['nome','quanti','tipo','grupo_id','pago']);
    }

    const update =async (id,despesa) =>{
        return app.db('despesa')
            .where({id})
            .update(despesa, '*');
    }

    return {save,findAll,validate,update};
}