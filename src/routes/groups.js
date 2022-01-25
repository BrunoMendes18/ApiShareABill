const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/:t/:id', (req, res, next) => {
    if (req.params.t == 1) {
      app.services.group.findAll(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    } else if (req.params.t == 2) {
      app.services.group.findOne(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    }
  });

  router.get('/:t/:id/:nome', (req, res, next) => {
    app.services.group.pesquisar(req.params.id, req.params.nome)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  const validate = (req, res, next) => {
    app.services.group.validate({ ...req.body })
      .then(() => next())
      .catch((err) => next(err));
  };

  router.post('/:id', validate, (req, res, next) => {
    const info = { ...req.body };
    app.services.group.save(info, req.params.id)
      .then((result) => res.status(201).json(result[0]))
      .catch((err) => next(err));
  });

  router.delete('/:id/:user', (req, res, next) => {
    app.services.group.deleteGroup(req.params.id, req.params.user)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });

  router.put('/:id', (req, res, next) => {
    app.services.group.atualizar(req.params.id, req.body)
      .then((result) => res.status(200).json(result[0]))
      .catch((err) => next(err));
  });

  return router;
};
