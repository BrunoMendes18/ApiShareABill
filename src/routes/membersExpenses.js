const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.post('/', (req, res, next) => {
    app.services.memberExpense.save(req.body)
      .then((result) => res.status(201).json(result[0]))
      .catch((err) => next(err));
  });

  router.get('/:id', (req, res, next) => {
    app.services.memberExpense.find({ desp_id: req.params.id })
      .then((result) => {
        return res.status(200).json(result);
      }).catch((err) => next(err));
  });

  router.put('/:idU/:idD', (req, res, next) => {
    app.services.memberExpense.liquidar(req.params.idU, req.params.idD, req.body)
      .then((result) => {
        return res.status(200).json(result);
      }).catch((err) => next(err));
  });

  router.delete('/:id', (req, res, next) => {
    app.services.memberExpense.remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });

  return router;
};
