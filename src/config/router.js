const express = require('express');

module.exports = (app) => {
    app.use('/auth', app.routes.auths);

    const secureRouter = express.Router();

    secureRouter.use('/users', app.routes.users);
    secureRouter.use('/amigos', app.routes.friends);
    secureRouter.use('/grupo', app.routes.groups);
    secureRouter.use('/despesas', app.routes.expenses);
    secureRouter.use('/membroGrupo', app.routes.membersGroups);

    app.use('/v1', app.config.passport.authenticate(), secureRouter);
};