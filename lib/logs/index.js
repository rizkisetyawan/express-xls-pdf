const moment = require('moment');

const info = (message) => {
	console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] : ${message}`);
};

const error = (message) => {
	console.error(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] : ${message}`);
};

module.exports = {
	info,
	error,
};
