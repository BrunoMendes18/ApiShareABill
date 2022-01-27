const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/:id', (req, res, next) => {
    app.services.friend.findAll(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.get('/:t/:id/:outro', (req, res, next) => {
    if (req.params.t == 1) {
      app.services.friend.findOne(req.params.id, req.params.outro)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    } else {
      app.services.friend.findByName(req.params.id, req.params.outro)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    }
  });

  router.post('/', (req, res, next) => {
    app.services.friend.save(req.body)
      .then((result) => res.status(201).json(result[0]))
      .catch((err) => next(err));
  });

  router.post('/:t/:id/:outro', (req, res, next) => {
    if (req.params.t == 1) {
      app.services.friend.save({ user_id1: req.params.id, user_id2: req.params.outro })
        .then((result) => res.status(200).json(result[0]))
        .catch((err) => next(err));
    }
  });

  router.delete('/:id', (req, res, next) => {
    app.services.friend.remover(req.body.id, req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });

  return router;
};
