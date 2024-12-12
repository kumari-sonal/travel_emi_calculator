const express = require('express');
const { getEmiDetails } = require('../controllers/emiController');

const router = express.Router();

router.post('/calculate', getEmiDetails);

module.exports = router;
