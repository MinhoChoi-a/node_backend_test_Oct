var express = require('express');
var router = express.Router();

const CARBON_DATA = require('../controllers/CarbonEmissionControl');
const TAX_DATA = require('../controllers/CarbonTaxControl');

//route for 'get data'
router.get('/carbon', CARBON_DATA.data_get);

router.get('/tax', TAX_DATA.data_get);

module.exports = router;
