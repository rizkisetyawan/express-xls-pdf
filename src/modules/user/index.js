const express = require('express');

const router = express.Router();
const { validate, hasRole } = require('../../middleware');
const { userSchema } = require('./schema');
const { createNewUser } = require('./service');

router.post(
  '/',
  validate('body', userSchema),
  hasRole('admin'),
  async (req, res) => {
    const {
      username, password, name, role,
    } = req.body;
    const { code, result } = await createNewUser(
      username,
      password,
      name,
      role,
    );
    res.status(code).json(result);
  },
);

module.exports = router;
