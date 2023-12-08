UPDATE customer SET first_name = $1, last_name = $2
WHERE customer_id = $3
RETURNING *;