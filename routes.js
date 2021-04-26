const { auth, user } = require('./modules');

const routes = (app) => {
	app.use('/api/auth', auth);
	app.use('/api/user', user);
};

module.exports = routes;
