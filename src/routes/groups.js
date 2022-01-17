const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        if(!req.body.nome) {
            app.services.group.findAll()
            .then((result)=>res.status(200).json(result))
            .catch((err)=>next(err));
        } else {
            app.services.group.pesquisar(req.body)
            .then((result) => res.status(200).json(result))
            .catch((err) => next(err))
        }
        
    });

    router.get('/:id', (req, res, next) => {
        app.services.group.findOne(req.params.id)
        .then((result) => res.status(200).json(result[0]))
        .catch((err) => next(err));
    })

    const validate = (req, res, next) => {
        app.services.group.validate({ ...req.body })
            .then(() => next())
            .catch((err) => next(err));
    };

    router.post('/', validate, (req, res, next) => {
        const info = {...req.body};
        app.services.group.save(info)
        .then((result) => res.status(201).json(result[0]))
        .catch((err) => next(err));
    });

    router.post('/:id', (req, res, next) => {
        app.services.group.addToGroup(req.params.id, req.body)
        .then((result) => res.status(201).json(result[0]))
        .catch((err) => next(err));
    });

    router.delete('/:id', (req, res, next) => {
        app.services.group.RemoveToGroup(req.params.id, req.body)
            .then(() => res.status(204).send())
            .catch((err) => next(err));
    });

    router.put('/:id', (req, res, next) => {
        app.services.group.atualizar(req.params.id, req.body) 
            .then((result) => res.status(200).json(result[0]))
            .catch((err) => next(err));
    })

    return router

};