CREATE TABLE IF NOT EXISTS public.customers
(
	customer_id SERIAL PRIMARY KEY,
	first_name VARCHAR(40) NOT NULL,
	last_name VARCHAR(40) NOT NULL
);