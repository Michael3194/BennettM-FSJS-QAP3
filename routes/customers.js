const express = require('express');
const router = express.Router();
const { getCustomers, addCustomer } = require('../services/dal.customers');

router.get('/', async (req, res) => {
  try {
    if (DEBUG) console.log('GET /customers route called');
    let theCustomers = await getCustomers();

    // Render the customers.ejs view and give the customers array to the view
    res.render('customers.ejs', { customers: theCustomers });
    if (DEBUG) console.log(theCustomers);
  } catch (err) {
    console.log(err.message);
    res.render('503.ejs');
  }
});

router.post('/', async (req, res) => {
  const { first_name, last_name } = req.body;

  try {
    // Add the new customer to the database
    if (DEBUG) console.log('POST /customers route called');
    await addCustomer(first_name, last_name);

    // Use a redirect to this route to trigger a new GET to update customers list shown
    res.redirect('/customers');
  } catch (err) {
    res
      .render('503.ejs')
      .send('An error occured while adding the customer to the database');
  }
});

module.exports = router;
