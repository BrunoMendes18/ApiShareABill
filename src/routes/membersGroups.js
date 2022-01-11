const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.post('/', (req, res, next) => {
        app.services.memberGroup.save(req.body)
        .then((result) => res.status(201).json(result[0]))
        .catch((err) => next(err));
    });

    return router

};