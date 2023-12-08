INSERT INTO public.customer (first_name, last_name)
VALUES ($1, $2)
RETURNING customer_id;