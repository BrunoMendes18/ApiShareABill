module.exports = (app) => {
  app.route('/auth/signin').post(app.routes.auths.signin);
  app.route('/auth/signup').post(app.routes.users.create);

  app.route('/users')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app.route('/grupo')
    .all(app.config.passport.authenticate())
    .get(app.routes.grupo.findAll)
    .post(app.routes.grupo.create);
};
