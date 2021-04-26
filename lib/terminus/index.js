const { createTerminus } = require('@godaddy/terminus');
const { endPool } = require('../pg');

function onSignal() {
	endPool();
	console.log('server is starting cleanup');
}

const terminus = (server) => {
	createTerminus(server, {
		signal: 'SIGINT',
		onSignal,
	});
};

module.exports = terminus;
