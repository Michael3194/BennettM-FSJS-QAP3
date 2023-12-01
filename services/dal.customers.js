const dal = require('./pgdatabase.js');

// Get the list of customersfrom the database
const getCustomers = async () => {
  if (DEBUG) console.log('Inside dal.customers.js getCustomers() function');

  const sql = `SELECT customer_id, first_name, last_name, email, has_membership
                 FROM customer
                 ORDER BY customer_id ASC LIMIT 4;`;
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

module.exports = { getCustomers };
