const express = require('express');
const router = express.Router();
const { validate, hasRole } = require('../../middleware');
const { loginSchema } = require('./schema');
const { passwordIsMatch, getLoggedIn } = require('./service');

router.get('/', hasRole('admin'), async (req, res) => {
	const { code, result } = await getLoggedIn(req.user.id);
	res.status(code).json(result);
});

router.post('/', validate('body', loginSchema), async (req, res) => {
	const { username, password } = req.body;
	const { code, result } = await passwordIsMatch(username, password);
	res.status(code).json(result);
});

module.exports = router;
