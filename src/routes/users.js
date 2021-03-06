const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    app.services.user.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.get('/:nome', (req, res, next) => {
    app.services.user.pesquisar(req.params.nome)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.get('/:t/:id', (req, res, next) => {
    if (req.params.t == 1) {
      app.services.user.findInfo(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    }
  });

  const validate = (req, res, next) => {
    app.services.user.validate({ ...req.body })
      .then(() => next())
      .catch((err) => next(err));
  };

  router.post('/', validate, (req, res, next) => {
    const user = { ...req.body };
    app.services.user.save(user)
      .then((result) => res.status(201).json(result[0]))
      .catch((err) => next(err));
  });

  return router;
};
