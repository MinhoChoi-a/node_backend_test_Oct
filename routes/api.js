var express = require('express');
var router = express.Router();

const CARBON_DATA = require('../controllers/CarbonEmissionControl');
const TAX_DATA = require('../controllers/CarbonTaxControl');
const HIGHEST_DATA = require('../controllers/HighestEmissionControl');

//route for 'get data'
router.get('/carbon', CARBON_DATA.data_get);

router.get('/tax', TAX_DATA.data_get);

//add sample data to Mongo
router.post('/highest', HIGHEST_DATA.data_post);

router.get('/highest', HIGHEST_DATA.data_get);

module.exports = router;
