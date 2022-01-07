const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        app.services.expense.findAll()
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    });

    return router

};