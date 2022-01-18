const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.post('/', (req, res, next) => {
        app.services.memberGroup.addToGroup(req.body)
            .then((result) => res.status(201).json(result[0]))
            .catch((err) => next(err));
    });
    
    router.delete('/', (req, res, next) => {
        app.services.memberGroup.RemoveToGroup(req.body)
            .then(() => res.status(204).send())
            .catch((err) => next(err));
    })


    return router
}