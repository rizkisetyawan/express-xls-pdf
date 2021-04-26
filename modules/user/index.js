const express = require('express');
const router = express.Router();
const { validate, hasRole } = require('../../middleware');
const { loginSchema } = require('./schema');
const { passwordIsMatch } = require('./service');

router.post('/', validate('body', loginSchema), async (req, res) => {
	const { username, password, role } = req.body;
	const { code, result } = await passwordIsMatch(username, password);
	res.status(code).json(result);
});

module.exports = router;
