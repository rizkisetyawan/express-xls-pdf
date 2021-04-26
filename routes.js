const { auth } = require('./modules');

const routes = (app) => {
	app.use('/api/auth', auth);
	app.use('/api/user', auth);
};

module.exports = routes;
