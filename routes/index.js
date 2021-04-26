var express = require('express');
var router = express.Router();
const { pg } = require('../lib/pg');

/* GET home page. */
router.get('/', function (req, res, next) {
	pg.query('SELECT NOW()')
		.then((resp) => {
			res.json({ data: 'connet' });
		})
		.catch((err) => {
			res.json({ data: err.message });
		});
});

module.exports = router;
