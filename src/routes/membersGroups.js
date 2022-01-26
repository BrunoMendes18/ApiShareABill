const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/:id', (req, res, next) => {
    app.services.memberGroup.verMembros(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  })

  router.post('/', (req, res, next) => {
    app.services.memberGroup.addToGroup(req.body)
      .then((result) => res.status(201).json(result[0]))
      .catch((err) => next(err));
  });

  router.delete('/:grupo/:user', (req, res, next) => {
    app.services.memberGroup.RemoveToGroup(req.params.grupo, req.params.user)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });

  return router;
};
