const dal = require('./pgdatabase.js');

// Get the list of customersfrom the database
const getCustomers = async () => {
  if (DEBUG) console.log('Inside dal.customers.js getCustomers() function');

  const sql = `SELECT customer_id, first_name, last_name, email, has_membership
                 FROM customer
                 ORDER BY customer_id DESC LIMIT 4;`;
  try {
    const result = await dal.query(sql, []);
    return result.rows;
  } catch (err) {
    console.log(
      'Error in dal.customers.js getCustomers() function: \n' + err.message
    );
    throw err;
  }
};

// Get a customer by customer_id
const getCustomerById = async (id) => {
  if (DEBUG) console.log('Inside dal.customers.js getCustomerById() function');

  const sql = `SELECT * FROM customer WHERE customer_id = $1;`;

  try {
    const result = await dal.query(sql, [id]);
    if (DEBUG) console.log(`Customer with id ${id} successfully found`);

    return result.rows[0]; // Return the customer
  } catch (err) {
    console.log(
      'Error in dal.customers.js getCustomerById() function: \n' + err.message
    );

    throw err;
  }
};

// Add a customer to the database
const addCustomer = async (first_name, last_name) => {
  const sql = `INSERT INTO public.customer (first_name, last_name)
               VALUES ($1, $2)
               RETURNING customer_id;`;

  if (DEBUG) console.log('dal.customers.js addCustomer() function called');

  try {
    // Try to add the customer to the database

    const result = await dal.query(sql, [first_name, last_name]);

    if (DEBUG) console.log('Customer added to database successfully');
    if (DEBUG) console.log(result.rows[0]);
  } catch (err) {
    // Catch and throw any errors

    console.log(
      'ERROR: dal.customers.js addCustomer() function failed\n + err.message: ${err.message}'
    );
    throw err;
  }
};

const patchCustomer = async (id, first_name, last_name) => {
  if (DEBUG) console.log('Inside dal.customers.js patchCustomer() function');

  const sql = `UPDATE customer SET first_name = $1, last_name = $2
              WHERE customer_id = $3
              RETURNING *;`;

  try {
    // Try to update the customer in the database
    const result = await dal.query(sql, [first_name, last_name, id]);

    if (DEBUG) console.log(`Customer with id ${id} successfully updated`);
    if (DEBUG) console.log(`Updated customer: ${result.rows[0]}`);

    // Return the updated customer
    return result.rows[0];
  } catch (err) {
    // Catch and throw any errors
    console.log(
      'Error in dal.customers.js patchCustomer() function: \n' +
        'Error message =' +
        err.message
    );

    throw err;
  }
};

const putCustomer = async (id, first_name, last_name) => {
  if (DEBUG) console.log('Inside dal.customers.js putCustomer() function');

  const sql = `UPDATE customer
              SET first_name = $1, last_name = $2
              WHERE customer_id = $3
              RETURNING *;`;

  try {
    // Try to update the customer in the database
    const result = await dal.query(sql, [first_name, last_name, id]);
    if (DEBUG) console.log(`Customer with id ${id} successfully updated`);
    if (DEBUG) console.log(`Updated customer: ${result.rows[0]}`);

    return result.rows[0];
  } catch (err) {
    // Catch and throw any errors
    console.log(
      'Error in dal.customers.js putCustomer() function: \n' +
        'Error message =' +
        err.message
    );

    throw err;
  }
};

const deleteCustomer = async (id) => {
  if (DEBUG) console.log('Inside dal.customers.js deleteCustomer() function');

  const sql = `DELETE FROM customer
               WHERE customer_id = $1;`;

  try {
    // Try to delete the customer from the database
    await dal.query(sql, [id]);
  } catch (err) {
    // Catch and throw any errors
    console.log(
      'Error in dal.customers.js deleteCustomer() function: \n' +
        'Error message =' +
        err.message
    );

    throw err;
  }
};

module.exports = {
  getCustomers,
  addCustomer,
  getCustomerById,
  patchCustomer,
  putCustomer,
  deleteCustomer,
};
