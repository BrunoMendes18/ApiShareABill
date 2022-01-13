const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    const validate = (req,res,next) => {
        app.services.expense.validate({...req.body})
        .then(()=>next())
        .catch((err) => next(err));
    };

    router.get('/', (req, res, next) => {
        app.services.expense.findAll()
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    });

    router.post('/',validate, (req, res, next) => {
        console.log('**************************************');
        console.log(req.body);
        app.services.expense.save(req.body)
        .then((result) => res.status(201).json(result[0]))
        .catch((err) => next(err));
    });

    router.put('/:id',validate,(req,res,next) =>{
        app.services.expense.update(req.params.id, req.body)
            .then((result)=> res.status(200).json(result[0]))
            .catch((err)=> next(err));
    });
    

    return router;

};