const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        app.services.friend.findAll(req.body.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    });

    router.post('/', (req, res, next) => {
        const amigos = { ...req.body }
        app.services.friend.save(amigos)
        .then((result) => res.status(201).json(result[0]))
        .catch((err) => next(err));
    });

    router.delete('/', (req, res, next) => {
        app.services.friend.del(req.body.id, red.body.idAmigo)
        .then((result) => res.status(204).json(result[0]))
        .catch((err) => next(err));
    })

    return router

}; 