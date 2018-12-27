CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  first_name VARCHAR,
  second_name VARCHAR,
  first_surname VARCHAR,
  second_surname VARCHAR,
  email VARCHAR
);

CREATE TABLE transactions (
  ID SERIAL PRIMARY KEY,
  customer INTEGER,
  date DATE,
  amount FLOAT
);
