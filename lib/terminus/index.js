const { createTerminus } = require('@godaddy/terminus');
const { endPool } = require('../pg');
const logs = require('../logs');

function onSignal() {
	endPool();
	logs.info('server is starting cleanup');
}

const terminus = (server) => {
	createTerminus(server, {
		signal: 'SIGINT',
		onSignal,
	});
};

module.exports = terminus;
