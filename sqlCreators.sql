CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  first_name VARCHAR,
  second_name VARCHAR,
  first_surname VARCHAR,
  second_surname VARCHAR,
  email VARCHAR
);

INSERT INTO users (first_name, first_surname, second_surname,email)
  VALUES ('Rolando', 'Andrade', 'Fernández','rolandoandradefernandez@gmail.com');

SELECT * FROM  users


select * from users
where LOWER(second_name)  like LOWER('')
order by ID


CREATE TABLE transactions (
  ID SERIAL PRIMARY KEY,
  customer INTEGER,
  date DATE,
  amount FLOAT
);

SELECT * FROM  transactions

INSERT INTO transactions (customer, date, amount)
  VALUES (1, '2018-12-16', 10.3);
