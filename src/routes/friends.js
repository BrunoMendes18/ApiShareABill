const express = require('express');
const res = require('express/lib/response');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        app.services.friend.findAll(req.body.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    });

    router.get('/:id', (req, res, next) => {
        app.services.friend.findOne(req.body.id, req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    })

    router.post('/', (req, res, next) => {
        const amigos = { ...req.body }
        app.services.friend.save(amigos)
        .then((result) => res.status(201).json(result[0]))
        .catch((err) => next(err));
    });

    router.delete('/:id', (req, res, next) => {
        app.services.friend.remover(req.body.id, req.params.id)
        .then(() => res.status(204).send())
        .catch((err) => next(err));
    })

    return router

}; 