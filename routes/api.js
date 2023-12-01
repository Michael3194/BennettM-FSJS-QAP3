const express = require('express');
const router = express.Router();
const { getCustomers } = require('../services/dal.customers.js');

// Route is localhost:3000/api
router.get('/', async (req, res) => {
  try {
    if (DEBUG) console.log('GET /api route called');
    res.render('api.ejs');
  } catch (err) {
    res.render('503.ejs');
    console.log(err.message);
  }
});

router.get('/customers', async (rec, res) => {
  try {
    if (DEBUG) console.log('GET /api/customers route called');
    let theCustomers = await getCustomers();
    res.json(theCustomers);
  } catch (err) {
    res.render('503.ejs');
    console.log(err.message);
  }
});

module.exports = router;
