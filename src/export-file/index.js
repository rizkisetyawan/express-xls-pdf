const router = require('express').Router();
const { toExcel, toPdf } = require('./service');

router.get('/excel', async (req, res) => {
  toExcel(res);
});

router.get('/pdf', (req, res) => {
  toPdf(res);
});

module.exports = router;
