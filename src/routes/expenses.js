const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  const validate = (req, res, next) => {
    app.services.expense.validate({ ...req.body })
      .then(() => next())
      .catch((err) => next(err));
  };

  /* router.get('/', (req, res, next) => {
    app.services.expense.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  }); */

  router.get('/:t/:id', (req, res, next) => {
    if (req.params.t == 1) {
      app.services.expense.find({ id: req.params.id })
        .then((result) => {
          return res.status(200).json(result);
        }).catch((err) => next(err));
    } else if (req.params.t == 2) {
      app.services.expense.grupo(req.params.id)
        .then((result) => {
          return res.status(200).json(result);
        }).catch((err) => next(err));
    } else {
      app.services.expense.findAll(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    }
  });

  router.post('/', validate, (req, res, next) => {
    app.services.expense.save(req.body)
      .then((result) => res.status(201).json(result[0]))
      .catch((err) => next(err));
  });

  router.put('/:id', (req, res, next) => {
    app.services.expense.update(req.params.id, req.body)
      .then((result) => res.status(200).json(result[0]))
      .catch((err) => next(err));
  });

  router.delete('/:id', (req, res, next) => {
    app.services.expense.remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });

  return router;
};
