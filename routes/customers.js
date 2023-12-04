const express = require('express');
const router = express.Router();
const {
  getCustomers,
  addCustomer,
  getCustomerById,
} = require('../services/dal.customers');

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

// localhost:3000/customers/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id; // Get the id from the url
  if (DEBUG) console.log('GET /customers/:id route called');

  try {
    // Try to get the specified customer from the database
    const theCustomer = await getCustomerById(id);
    // Render the customer.ejs view and give it theCustomer
    res.render('customer.ejs', { theCustomer });

    if (DEBUG) {
      console.log(
        `GET on /customers/:id route successful\ntheCustomer:${theCustomer}`
      );
    }
  } catch (err) {
    // If an error occurs log it and then render the 503.ejs view
    console.log('Error in GET /customers/:id route: ' + err.message);
    res.render('503.ejs');
  }
});

router.post('/', async (req, res) => {
  const { first_name, last_name } = req.body;

  try {
    // Add the new customer to the database
    if (DEBUG) console.log('POST /customers route called');
    await addCustomer(first_name, last_name);

    // Use a redirect to this route to trigger a new GET to update the customers list shown on page
    res.redirect('/customers');
  } catch (err) {
    res
      .render('503.ejs')
      .send('An error occured while adding the customer to the database');
  }
});

module.exports = router;
