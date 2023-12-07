const express = require('express');
const router = express.Router();
const {
  getCustomers,
  addCustomer,
  getCustomerById,
  patchCustomer,
  putCustomer,
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

router.get('/:id/edit', async (req, res) => {
  if (DEBUG) console.log('GET /customers/edit/:id route called');
  if (DEBUG) console.log(`Editing customer: ${req.params.id}`);

  try {
    // Get the id, first_name, and last_name from the query string
    const id = req.params.id;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;

    // Save a trip to the database by getting the first and last name from the query string
    // Try to get the customer from the database
    // const theCustomer = await getCustomerById(id);

    // Render the editCustomer.ejs view and give it the id, first_name, and last_name
    res.render('editCustomer.ejs', { id, first_name, last_name });
  } catch (err) {
    // If an error occurs, log it, and then render the 503.ejs view
    console.log(`Error in GET /customers/:id/edit route: ${err.message}`);
    res.render('503.ejs');
  }
});

router.patch('/:id', async (req, res) => {
  if (DEBUG) console.log('PATCH /customers/:id route called');
  const id = req.params.id;
  const { first_name, last_name } = req.body;

  try {
    await patchCustomer(id, first_name, last_name);
    if (DEBUG) console.log(`Customer ${id} successfully updated`);
    res.redirect('/customers');
  } catch (err) {
    console.log(`Error in PATCH /customers/:id route: ${err.message}`);
    res.render('503.ejs');
  }
});

router.get('/:id/replace', async (req, res) => {
  if (DEBUG) console.log('GET /customers/:id/replace route called');
  if (DEBUG) console.log(`Replacing customer: ${req.params.id}`);

  try {
    // Get the id, first_name, and last_name from the query string
    const id = req.params.id;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;

    // Render the replaceCustomer.ejs view and give it the id, first_name, and last_name
    res.render('replaceCustomer.ejs', { id, first_name, last_name });
  } catch (err) {
    // If an error occurs, log it, and then render the 503.ejs view
    console.log(`Error in GET /customers/:id/replace route: ${err.message}`);
    res.render('503.ejs');
  }
});

router.put('/:id', async (req, res) => {
  if (DEBUG) console.log('PUT /customers/:id route called');
  const id = req.params.id;
  const { first_name, last_name } = req.body;

  try {
    await putCustomer(id, first_name, last_name);
    res.redirect('/customers');
  } catch (err) {
    console.log(`Error in PUT /customers/:id route: ${err.message}`);
    res.render('503.ejs');
  }
});

module.exports = router;
