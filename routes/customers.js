const express = require('express');
const router = express.Router();
const { getCustomers } = require('../services/dal.customers');

router.get('/', async (req, res) => {
  try {
    if (DEBUG) console.log('GET /customers route called');
    let theCustomers = await getCustomers();

    // Render the customers.ejs view and give the customers array to the view
    res.render('customers.ejs', { customers: theCustomers });
    if (DEBUG) console.log(theCustomers);
  } catch (err) {
    res.render('503.ejs');
    console.log(err.message);
  }
});

module.exports = router;
