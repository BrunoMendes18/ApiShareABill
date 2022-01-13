const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.post('/', (req, res, next) => {
        app.services.memberGroup.save(req.body)
        .then((result) => res.status(201).json(result[0]))
        .catch((err) => next(err));
    });

    router.delete('/:id', (req, res, next) => {
        app.services.memberGroup.remove(req.params.id)
            .then(() => res.status(204).send())
            .catch((err) => next(err));
    });

    return router

};